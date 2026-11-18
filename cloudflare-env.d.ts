declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    SOLANA_RPC_URL?: string;
    VRF_PROGRAM_ID?: string;
    VRF_SPONSOR_SEED?: string;
    ESCROW_PROGRAM_ID?: string;
  }
}
