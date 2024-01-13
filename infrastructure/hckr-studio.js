import cloudflare from "@pulumi/cloudflare";

export function createDnsZone(account) {
  const zone = new cloudflare.Zone("hckr.studio", {
    accountId: account.id,
    plan: "free",
    zone: "hckr.studio",
  }, { protect: true });

  return { zone };
}
