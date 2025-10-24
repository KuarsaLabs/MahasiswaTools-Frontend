// @note text formatting keys
export type CustomTextKey = 'bold' | 'italic' | 'underline' | 'code';

// @note element types
export type CustomElementType = 
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list'
  | 'list-item';

// @note custom text interface
export interface CustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

// @note base custom element interface
export interface CustomElement {
  type: CustomElementType;
  children: CustomText[];
}

// @note custom element with alignment
export interface CustomElementWithAlign extends CustomElement {
  align?: 'left' | 'center' | 'right' | 'justify';
}

// @note custom editor type - simplified to avoid circular imports
export type CustomEditor = any;
