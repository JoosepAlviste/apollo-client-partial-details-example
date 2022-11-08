/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n    query character($characterId: ID!) {\n      character(id: $characterId) {\n        id\n        name\n        image\n        gender\n        status\n        species\n        episode {\n          id\n          name\n        }\n      }\n    }\n  ": types.CharacterDocument,
    "\n    query characters {\n      characters {\n        results {\n          id\n          image\n          name\n        }\n      }\n    }\n  ": types.CharactersDocument,
};

export function graphql(source: "\n    query character($characterId: ID!) {\n      character(id: $characterId) {\n        id\n        name\n        image\n        gender\n        status\n        species\n        episode {\n          id\n          name\n        }\n      }\n    }\n  "): (typeof documents)["\n    query character($characterId: ID!) {\n      character(id: $characterId) {\n        id\n        name\n        image\n        gender\n        status\n        species\n        episode {\n          id\n          name\n        }\n      }\n    }\n  "];
export function graphql(source: "\n    query characters {\n      characters {\n        results {\n          id\n          image\n          name\n        }\n      }\n    }\n  "): (typeof documents)["\n    query characters {\n      characters {\n        results {\n          id\n          image\n          name\n        }\n      }\n    }\n  "];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;