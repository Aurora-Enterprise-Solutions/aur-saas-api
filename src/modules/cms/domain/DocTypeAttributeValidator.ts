export interface DocTypeAttributeValidators {
  required?: boolean;
  caseSensitive?: boolean;
  max?: number;
  min?: number;
  minLength?: number;
  maxLength?: number;
  private?: boolean;
}

export default DocTypeAttributeValidators
