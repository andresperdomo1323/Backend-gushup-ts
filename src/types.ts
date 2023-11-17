interface TextMessage {
    image: { type: string; originalUrl: string; previewUrl: string; caption: string; };
    type: 'text';
    text: string;
  }
  
  export { TextMessage };
  