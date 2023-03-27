import { JSONSchema6 } from 'json-schema';

const PostMessageReq: JSONSchema6 = {
  additionalProperties: false,
  properties: {
    uid: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    author: {
      properties: {
        displayName: {
          type: 'string',
        },
        photoURL: {
          type: 'string',
        },
      },
      required: ['displayName'],
    },
  },
  required: ['uid', 'message'],
};

export default PostMessageReq;
