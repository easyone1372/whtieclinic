export const Document: string[] = [
  '간이영수증',
  '세금계산서',
  '현금영수증',
  '카드영수증',
  '필요없음',
];

export const DocumentsOption = Document.map((supportingDocuments) => ({
  text: supportingDocuments,
  value: supportingDocuments,
}));