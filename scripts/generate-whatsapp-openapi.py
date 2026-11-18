#!/usr/bin/env python3
"""
Generate whatsapp-api/openapi.json and one reference page per operation
(whatsapp-api/reference/{slug}.mdx) from the route list below.

Keep ROUTES in sync with packages/plugin-whatsapp-api/src/publicApi/routes.ts.
Run from the docs folder:  python3 scripts/generate-whatsapp-openapi.py
"""

import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPEC_PATH = os.path.join(ROOT, 'whatsapp-api', 'openapi.json')
PAGES_DIR = os.path.join(ROOT, 'whatsapp-api', 'reference')

META = 'Fields follow the standard WhatsApp Cloud API.'

# (tag, method, path, summary, description, options)
ROUTES = [
    ('Messages', 'post', '/messages', 'Send a message',
     'Send any WhatsApp message type, mark a message as read, or show a typing indicator. Billable sends reserve their cost from the wallet first. ' + META,
     {'body': 'message', 'billable': True}),
    ('Messages', 'post', '/marketing_messages', 'Send a marketing message',
     'Send a marketing template through the Marketing Messages API. Billable. ' + META,
     {'body': 'message', 'billable': True}),

    ('Media', 'post', '/media', 'Upload media',
     'Upload a file as `multipart/form-data` (up to 100 MB). Returns a media ID valid for 30 days.',
     {'multipart': True}),
    ('Media', 'get', '/{mediaId}', 'Retrieve media',
     'Media metadata. `url` is a Karzoun download URL that works with your API key.',
     {'params': ['mediaId']}),
    ('Media', 'get', '/{mediaId}/download', 'Download media',
     'Stream the file with its original `Content-Type`.',
     {'params': ['mediaId'], 'binary': True}),
    ('Media', 'delete', '/{mediaId}', 'Delete media', 'Delete an uploaded file.', {'params': ['mediaId']}),
    ('Media', 'post', '/uploads', 'Start a resumable upload',
     'Start an upload session for a template sample. Query: `file_name`, `file_length`, `file_type`. Returns `{ "id": "upload:…" }`.',
     {'query': ['file_name', 'file_length', 'file_type']}),
    ('Media', 'post', '/upload:{uploadId}', 'Upload file bytes',
     'Send the raw file to the session (not multipart) with header `file_offset`. Returns `{ "h": "…" }` for `example.header_handle`. Keep the `sig` query parameter from the session ID.',
     {'params': ['uploadId'], 'raw': True, 'headers': ['file_offset']}),
    ('Media', 'get', '/upload:{uploadId}', 'Read upload progress',
     'Current `file_offset` of an interrupted upload.', {'params': ['uploadId']}),

    ('Templates', 'get', '/message_templates', 'List templates', 'Supports `fields`, `limit`, `status`, `name` and `after`.', {}),
    ('Templates', 'post', '/message_templates', 'Create a template', META, {'body': 'object'}),
    ('Templates', 'delete', '/message_templates', 'Delete a template by name',
     'Deletes every language of the template. Query: `name`.', {'query': ['name']}),
    ('Templates', 'get', '/message_templates/{templateId}', 'Get a template', META, {'params': ['templateId']}),
    ('Templates', 'post', '/message_templates/{templateId}', 'Edit a template', META,
     {'params': ['templateId'], 'body': 'object'}),
    ('Templates', 'delete', '/message_templates/{templateId}', 'Delete a template',
     'Deletes one template by ID. Query: `name` (required by Meta).', {'params': ['templateId'], 'query': ['name']}),
    ('Templates', 'get', '/message_template_library', 'Browse the template library', META, {}),
    ('Templates', 'get', '/template_analytics', 'Get template analytics',
     'Daily sent, delivered, read, clicked and cost metrics per template. `start` and `end` are Unix timestamps; `granularity` is `DAILY`. Optional: `template_ids` and `metric_types` as JSON arrays.',
     {'query': ['start', 'end', 'granularity'], 'optional_query': ['template_ids', 'metric_types', 'use_waba_timezone']}),
    ('Templates', 'post', '/template_analytics', 'Enable template analytics',
     'Turns template analytics on for this WhatsApp Business Account. Needed once before `GET /template_analytics` returns data.', {}),

    ('Flows', 'get', '/flows', 'List flows', META, {}),
    ('Flows', 'post', '/flows', 'Create a flow', META, {'body': 'object'}),
    ('Flows', 'get', '/flows/{flowId}', 'Get a flow', META, {'params': ['flowId']}),
    ('Flows', 'post', '/flows/{flowId}', 'Update a flow', META, {'params': ['flowId'], 'body': 'object'}),
    ('Flows', 'delete', '/flows/{flowId}', 'Delete a draft flow', META, {'params': ['flowId']}),
    ('Flows', 'get', '/flows/{flowId}/assets', 'List flow assets', META, {'params': ['flowId']}),
    ('Flows', 'post', '/flows/{flowId}/assets', 'Upload Flow JSON', 'Send `multipart/form-data` with `name`, `asset_type=FLOW_JSON` and `file`.',
     {'params': ['flowId'], 'multipart': True}),
    ('Flows', 'post', '/flows/{flowId}/publish', 'Publish a flow', META, {'params': ['flowId']}),
    ('Flows', 'post', '/flows/{flowId}/deprecate', 'Deprecate a flow', META, {'params': ['flowId']}),

    ('Groups', 'get', '/groups', 'List groups', META, {}),
    ('Groups', 'post', '/groups', 'Create a group', META, {'body': 'object'}),
    ('Groups', 'get', '/groups/{groupId}', 'Get a group', META, {'params': ['groupId']}),
    ('Groups', 'post', '/groups/{groupId}', 'Update a group', META, {'params': ['groupId'], 'body': 'object'}),
    ('Groups', 'delete', '/groups/{groupId}', 'Delete a group', META, {'params': ['groupId']}),
    ('Groups', 'get', '/groups/{groupId}/invite_link', 'Get the invite link', META, {'params': ['groupId']}),
    ('Groups', 'post', '/groups/{groupId}/invite_link', 'Reset the invite link', META, {'params': ['groupId']}),
    ('Groups', 'delete', '/groups/{groupId}/participants', 'Remove participants', META, {'params': ['groupId'], 'body': 'object'}),
    ('Groups', 'get', '/groups/{groupId}/join_requests', 'List join requests', META, {'params': ['groupId']}),
    ('Groups', 'post', '/groups/{groupId}/join_requests', 'Approve join requests', META, {'params': ['groupId'], 'body': 'object'}),
    ('Groups', 'delete', '/groups/{groupId}/join_requests', 'Reject join requests', META, {'params': ['groupId'], 'body': 'object'}),

    ('Calling', 'post', '/calling/calls', 'Manage a call', 'Start, pre-accept, accept, reject or end a call. Billable. ' + META,
     {'body': 'object', 'billable': True}),
    ('Calling', 'get', '/calling/settings', 'Get calling settings', META, {}),
    ('Calling', 'post', '/calling/settings', 'Update calling settings', META, {'body': 'object'}),
    ('Calling', 'get', '/calling/permissions/{waId}', 'Get call permission', 'Whether you may call this WhatsApp user.', {'params': ['waId']}),

    ('Number settings', 'get', '/health_status', 'Get health status', 'Whether this number and its account can send messages.', {}),
    ('Number settings', 'get', '/whatsapp_business_profile', 'Get business profile', META, {}),
    ('Number settings', 'post', '/whatsapp_business_profile', 'Update business profile', META, {'body': 'object'}),
    ('Number settings', 'get', '/block_users', 'List blocked users', META, {}),
    ('Number settings', 'post', '/block_users', 'Block users', META, {'body': 'object'}),
    ('Number settings', 'delete', '/block_users', 'Unblock users', META, {'body': 'object'}),
    ('Number settings', 'get', '/conversational_automation', 'Get conversational components', META, {}),
    ('Number settings', 'post', '/conversational_automation', 'Set conversational components', META, {'body': 'object'}),
    ('Number settings', 'delete', '/conversational_automation', 'Remove conversational components', META, {}),
    ('Number settings', 'get', '/business_compliance_info', 'Get business compliance info', META, {}),
    ('Number settings', 'post', '/business_compliance_info', 'Set business compliance info', META, {'body': 'object'}),
    ('Number settings', 'get', '/whatsapp_business_encryption', 'Get encryption public key', META, {}),
    ('Number settings', 'post', '/whatsapp_business_encryption', 'Set encryption public key', META, {'body': 'object'}),

    ('Usernames', 'get', '/username', 'Get the business username', 'Current username and its `status`. `username` is omitted when none is set.', {}),
    ('Usernames', 'post', '/username', 'Claim or change the business username', 'Body: `{ "username": "acme" }`. Returns `{ "status": "…" }`.',
     {'body': 'username'}),
    ('Usernames', 'delete', '/username', 'Delete the business username', 'Removes the username from this number.', {}),
    ('Usernames', 'get', '/username_suggestions', 'List reserved username suggestions', 'Usernames WhatsApp reserved for this business.', {}),
    ('Usernames', 'delete', '/contact_book', 'Delete a contact book entry',
     'Removes the phone ↔ BSUID entry for one user. Query: `bsuid` and `messaging_product=whatsapp`. Parent BSUIDs aren\'t supported.',
     {'query': ['bsuid', 'messaging_product']}),

    ('Commerce', 'get', '/whatsapp_commerce_settings', 'Get commerce settings', 'Whether the cart and the catalog are shown for this number.', {}),
    ('Commerce', 'post', '/whatsapp_commerce_settings', 'Update commerce settings',
     'Query: `is_cart_enabled` and/or `is_catalog_visible` (`true` or `false`).', {'optional_query': ['is_cart_enabled', 'is_catalog_visible']}),
    ('Commerce', 'get', '/product_catalogs', 'List catalogs', 'Catalogs connected to this WhatsApp Business Account. Supports `fields`, `limit`, `after`.', {}),
    ('Commerce', 'get', '/product_catalogs/{catalogId}/products', 'List catalog products',
     'Products in a catalog connected to this account. Supports `fields`, `limit`, `after`, `filter`.', {'params': ['catalogId']}),

    ('Webhooks', 'get', '/webhook', 'Get the webhook', 'This number\'s webhook URL and masked custom headers.', {'karzoun': 'webhookView'}),
    ('Webhooks', 'post', '/webhook', 'Set the webhook',
     'Set or clear (empty `url`) this number\'s webhook. The URL must accept a signed test event (2xx within 5 seconds). Omit `headers` to keep them; `[]` removes them.',
     {'karzoun': 'webhookView', 'body': 'webhook'}),
    ('Webhooks', 'post', '/webhook/test', 'Send a test event', 'Send a signed test event to this number\'s webhook URL.', {'karzoun': 'webhookTest'}),
    ('Webhooks', 'get', '/waba_webhook', 'List account webhooks', 'Webhook URLs of every number in this WhatsApp Business Account.', {'karzoun': 'wabaWebhook'}),
    ('Webhooks', 'post', '/waba_webhook', 'Set the account webhook',
     'Set one URL on the account\'s numbers. `override_all: false` only fills numbers without a URL.',
     {'karzoun': 'wabaWebhookSet', 'body': 'wabaWebhook'}),
]

PARAM_DOCS = {
    'mediaId': 'Media ID from an upload or an incoming message.',
    'uploadId': 'The part after `upload:` in the session ID.',
    'templateId': 'Template ID.',
    'flowId': 'Flow ID.',
    'groupId': 'Group ID.',
    'waId': 'WhatsApp ID (phone number) of the user.',
    'catalogId': 'ID of a catalog connected to this WhatsApp Business Account.',
}


def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')


def error_response(description, message):
    return {
        'description': description,
        'content': {'application/json': {'schema': {'$ref': '#/components/schemas/KarzounError'},
                                          'example': {'error': {'message': message, 'type': 'Karzoun', 'code': int(description[:3])}}}},
    }


def build():
    paths = {}
    for tag, method, path, summary, description, opts in ROUTES:
        op = {
            'tags': [tag],
            'summary': summary,
            'description': description,
            'operationId': slugify(summary).replace('-', '_'),
            'responses': {
                '200': {'description': 'Success.', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/MetaResponse'}}}},
                '401': error_response('401 Invalid API key', 'Invalid API key'),
                '404': error_response('404 Not found', f'No such path {method.upper()} {path}'),
            },
        }
        params = []
        for name in opts.get('params', []):
            params.append({'name': name, 'in': 'path', 'required': True, 'schema': {'type': 'string'}, 'description': PARAM_DOCS[name]})
        for name in opts.get('query', []):
            params.append({'name': name, 'in': 'query', 'required': name != 'name' or method == 'delete', 'schema': {'type': 'string'}})
        for name in opts.get('headers', []):
            params.append({'name': name, 'in': 'header', 'required': True, 'schema': {'type': 'string', 'default': '0'}})
        for name in opts.get('optional_query', []):
            params.append({'name': name, 'in': 'query', 'required': False, 'schema': {'type': 'string'}})
        if params:
            op['parameters'] = params

        body = opts.get('body')
        if body == 'message':
            op['requestBody'] = {'required': True, 'content': {'application/json': {
                'schema': {'$ref': '#/components/schemas/Message'},
                'examples': {
                    'template': {'summary': 'Template', 'value': {
                        'messaging_product': 'whatsapp', 'to': '966500000000', 'type': 'template',
                        'template': {'name': 'hello_world', 'language': {'code': 'en_US'}}}},
                    'text': {'summary': 'Text', 'value': {
                        'messaging_product': 'whatsapp', 'to': '966500000000', 'type': 'text',
                        'text': {'body': 'Your order #1042 is on its way.'}}},
                }}}}
            op['responses']['200'] = {'description': 'Message accepted.', 'content': {'application/json': {
                'schema': {'$ref': '#/components/schemas/MetaResponse'},
                'examples': {'sent': {'summary': 'Accepted', 'value': {
                    'messaging_product': 'whatsapp',
                    'contacts': [{'input': '966500000000', 'wa_id': '966500000000'}],
                    'messages': [{'id': 'wamid.HBgMOTY2NTAwMDAwMDAwFQIAERgS...'}]}}}}}}
        elif body == 'username':
            op['requestBody'] = {'required': True, 'content': {'application/json': {
                'schema': {'type': 'object', 'required': ['username'], 'properties': {'username': {'type': 'string'}}},
                'examples': {'claim': {'summary': 'Claim a username', 'value': {'username': 'acme'}}}}}}
        elif body == 'object':
            op['requestBody'] = {'required': True, 'content': {'application/json': {'schema': {'type': 'object', 'additionalProperties': True}}}}
        elif body == 'webhook':
            op['requestBody'] = {'required': True, 'content': {'application/json': {
                'schema': {'$ref': '#/components/schemas/WebhookInput'},
                'examples': {'set': {'summary': 'Set URL and header', 'value': {
                    'url': 'https://example.com/whatsapp/webhook',
                    'headers': [{'name': 'Authorization', 'value': 'Bearer my-gateway-token'}]}},
                    'clear': {'summary': 'Stop forwarding', 'value': {'url': ''}}}}}}
        elif body == 'wabaWebhook':
            op['requestBody'] = {'required': True, 'content': {'application/json': {
                'schema': {'allOf': [{'$ref': '#/components/schemas/WebhookInput'},
                                     {'type': 'object', 'properties': {'override_all': {'type': 'boolean', 'default': False}}}]},
                'examples': {'all': {'summary': 'Every number', 'value': {
                    'url': 'https://example.com/whatsapp/webhook', 'override_all': True}}}}}}
        if opts.get('multipart'):
            op['requestBody'] = {'required': True, 'content': {'multipart/form-data': {'schema': {
                'type': 'object', 'properties': {'messaging_product': {'type': 'string', 'example': 'whatsapp'},
                                                 'type': {'type': 'string', 'example': 'image/jpeg'},
                                                 'file': {'type': 'string', 'format': 'binary'}}}}}}
        if opts.get('raw'):
            op['requestBody'] = {'required': True, 'content': {'application/octet-stream': {'schema': {'type': 'string', 'format': 'binary'}}}}
        if opts.get('binary'):
            op['responses']['200'] = {'description': 'The file.', 'content': {'application/octet-stream': {'schema': {'type': 'string', 'format': 'binary'}}}}

        karzoun = opts.get('karzoun')
        if karzoun:
            schema = {'webhookView': 'WebhookView', 'webhookTest': 'WebhookTestResult',
                      'wabaWebhook': 'WabaWebhookList', 'wabaWebhookSet': 'WabaWebhookSetResult'}[karzoun]
            op['responses']['200'] = {'description': 'OK', 'content': {'application/json': {'schema': {'$ref': f'#/components/schemas/{schema}'}}}}
            if body in ('webhook', 'wabaWebhook'):
                op['responses']['400'] = error_response('400 Invalid webhook', 'Your endpoint did not accept the test event (HTTP 500). It must answer 2xx within 5 seconds.')
        if opts.get('billable'):
            op['responses']['402'] = error_response('402 Wallet can\'t cover this send',
                                                    'Wallet can cover 120 cents, 300 cents are already held, this send needs 45')
        op['responses']['502'] = error_response('502 WhatsApp unreachable', 'Meta request failed')

        # The site generates curl from required fields only; give operations with
        # a request example an explicit sample so the full body shows.
        json_body = op.get('requestBody', {}).get('content', {}).get('application/json', {})
        first_example = next(iter(json_body.get('examples', {}).values()), {}).get('value')
        if first_example is not None:
            sample_path = re.sub(r'\{(\w+)\}', lambda m: m.group(1).upper(), path)
            op['x-codeSamples'] = [{
                'lang': 'bash',
                'label': 'cURL',
                'source': (
                    f"curl -X {method.upper()} https://waba.karzoun.chat{sample_path} \\\n"
                    "  -H 'Content-Type: application/json' \\\n"
                    "  -H 'Karzoun-API-Key: YOUR_API_KEY' \\\n"
                    f"  -d '{json.dumps(first_example, ensure_ascii=False, indent=2)}'"
                ),
            }]
        paths.setdefault(path, {})[method] = op

    spec = {
        'openapi': '3.1.0',
        'info': {
            'title': 'Karzoun WhatsApp API',
            'version': '1.0.0',
            'description': 'The Karzoun WhatsApp API, built on the WhatsApp Business Platform. One API key per phone number; endpoints never take a phone number ID or account ID.',
        },
        'servers': [{'url': 'https://waba.karzoun.chat'}],
        'security': [{'KarzounApiKey': []}],
        'tags': [{'name': t} for t in dict.fromkeys(r[0] for r in ROUTES)],
        'paths': paths,
        'components': {
            'securitySchemes': {'KarzounApiKey': {'type': 'apiKey', 'in': 'header', 'name': 'Karzoun-API-Key',
                                                  'description': 'Per-number key from the number\'s API tab.'}},
            'schemas': {
                'KarzounError': {'type': 'object', 'properties': {'error': {'type': 'object', 'properties': {
                    'message': {'type': 'string'}, 'type': {'type': 'string', 'const': 'Karzoun'}, 'code': {'type': 'integer'}}}}},
                'MetaResponse': {'type': 'object', 'additionalProperties': True,
                                 'description': 'Response body in the standard WhatsApp Cloud API format.'},
                'Message': {'type': 'object', 'additionalProperties': True, 'required': ['messaging_product'],
                            'properties': {'messaging_product': {'type': 'string', 'const': 'whatsapp'},
                                           'to': {'type': 'string', 'description': 'Phone number, digits only.'},
                                           'recipient': {'type': 'string', 'description': 'Business-scoped user ID, instead of `to`.'},
                                           'type': {'type': 'string', 'description': 'text, image, audio, video, document, sticker, location, contacts, interactive, template, reaction…'},
                                           'category': {'type': 'string', 'description': '`utility` for Direct Send.'}}},
                'WebhookHeader': {'type': 'object', 'required': ['name', 'value'],
                                  'properties': {'name': {'type': 'string'}, 'value': {'type': 'string'}}},
                'WebhookInput': {'type': 'object', 'required': ['url'], 'properties': {
                    'url': {'type': 'string', 'description': 'https URL on port 443. Empty string clears it.'},
                    'headers': {'type': 'array', 'maxItems': 5, 'items': {'$ref': '#/components/schemas/WebhookHeader'}}}},
                'WebhookView': {'type': 'object', 'properties': {
                    'url': {'type': 'string'},
                    'headers': {'type': 'array', 'items': {'$ref': '#/components/schemas/WebhookHeader'},
                                'description': 'Values are masked.'}}},
                'WebhookTestResult': {'type': 'object', 'properties': {
                    'success': {'type': 'boolean'}, 'status_code': {'type': ['integer', 'null']},
                    'latency_ms': {'type': 'integer'}, 'error': {'type': ['string', 'null']}}},
                'WabaWebhookList': {'type': 'object', 'properties': {
                    'waba_id': {'type': 'string'},
                    'phone_numbers': {'type': 'array', 'items': {'type': 'object', 'properties': {
                        'phone_number_id': {'type': 'string'}, 'display_phone_number': {'type': ['string', 'null']},
                        'url': {'type': 'string'}}}}}},
                'WabaWebhookSetResult': {'type': 'object', 'properties': {
                    'url': {'type': 'string'}, 'updated_numbers': {'type': 'integer'}}},
            },
        },
    }
    return spec


def write_pages():
    os.makedirs(PAGES_DIR, exist_ok=True)
    keep = {'errors.mdx'}
    for name in os.listdir(PAGES_DIR):
        if name.endswith('.mdx') and name not in keep:
            os.remove(os.path.join(PAGES_DIR, name))
    nav = {}
    for tag, method, path, summary, _desc, _opts in ROUTES:
        slug = slugify(summary)
        with open(os.path.join(PAGES_DIR, f'{slug}.mdx'), 'w') as f:
            f.write(f'---\nopenapi: "whatsapp-api/openapi.json {method.upper()} {path}"\n---\n')
        nav.setdefault(tag, []).append(f'whatsapp-api/reference/{slug}')
    return nav


if __name__ == '__main__':
    with open(SPEC_PATH, 'w') as f:
        json.dump(build(), f, indent=2, ensure_ascii=False)
        f.write('\n')
    print(json.dumps(write_pages(), indent=2))
