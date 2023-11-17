export interface TextMessage {
  type: 'text';
  text: string;
  phoneNumber?: string;
}

export interface ImageMessage {
  type: 'image';
  originalUrl: string;
  previewUrl: string;
  caption?: string;
}

export interface FileMessage {
  type: 'file';
  url: string;
  filename: string;
}

export interface AudioMessage {
  type: 'audio';
  url: string;
}

export interface VideoMessage {
  type: 'video';
  url: string;
}

export interface StickerMessage {
  type: 'sticker';
  url: string;
}

export interface InteractiveListMessage {
  type: 'list';
  title: string;
  body: string;
  msgid: string;
  globalButtons: { type: 'text'; title: string }[];
  items: {
    title: string;
    subtitle: string;
    options: {
      type: 'text';
      title: string;
      description: string;
      postbackText: string;
    }[];
  }[];
}