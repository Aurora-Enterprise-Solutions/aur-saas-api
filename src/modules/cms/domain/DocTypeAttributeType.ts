export enum DocTypeAttributeStringTypeCategory {
  text = 'text',
  richtext = 'richtext',
  enumeration = 'enumeration',
  email = 'email',
  password = 'password',
  uid = 'uid',
}

export enum DocTypeAttributeDateTypeCategory {
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  timestamp = 'timestamp',
}

export enum DocTypeAttributeNumberTypeCategory {
  integer = 'integer',
  decimal = 'decimal',
}

export enum DocTypeAttributeGenericTypeCategory {
  boolean = 'boolean',
  json = 'json',
  media = 'media',
}

export enum DocTypeAttributeSpecialTypeCategory {
  relation = 'relation',
}

export type DocTypeAttributeType =
  keyof typeof DocTypeAttributeStringTypeCategory |
  keyof typeof DocTypeAttributeDateTypeCategory |
  keyof typeof DocTypeAttributeNumberTypeCategory |
  keyof typeof DocTypeAttributeGenericTypeCategory |
  keyof typeof DocTypeAttributeSpecialTypeCategory

export default DocTypeAttributeType
