import crypto from "crypto";

function pad2(n: number) { return n.toString().padStart(2, "0"); }
function emv(id: string, value: string) { return `${id}${pad2(value.length)}${value}`; }

// CRC-16/CCITT-FALSE
function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function newTxid() {
  return crypto.randomBytes(12).toString("hex");
}

export function buildPixPayload(opts: {
  chave: string;
  valorCents: number;
  nome: string;
  cidade: string;
  txid: string;
}) {
  const valor = (opts.valorCents / 100).toFixed(2);

  const gui = emv("00", "br.gov.bcb.pix");
  const key = emv("01", opts.chave);
  const desc = emv("02", `GenieBox:${opts.txid}`);
  const mai = emv("26", `${gui}${key}${desc}`);

  const payloadNoCrc =
    emv("00", "01") +
    emv("01", "12") +
    mai +
    emv("52", "0000") +
    emv("53", "986") +
    emv("54", valor) +
    emv("58", "BR") +
    emv("59", opts.nome.slice(0, 25)) +
    emv("60", opts.cidade.slice(0, 15)) +
    emv("62", emv("05", opts.txid.slice(0, 35))) +
    "6304";

  const crc = crc16(payloadNoCrc);
  return payloadNoCrc + crc;
}
