import cloudflare from "@pulumi/cloudflare";
import { registerRedirectRecords } from "./dns.js";

/** @typedef {import("@pulumi/cloudflare/types/input.js").PagesProjectDeploymentConfigsProduction} PagesProjectDeploymentConfigsProduction */

/**
 * @param {Object} options
 * @param {PagesProjectDeploymentConfigsProduction} options.productionConfiguration
 */
export function createPages(account, zone, recordName, projectName, { productionConfiguration } = {}) {
  const pages = new cloudflare.PagesProject(`${projectName}/pages`, {
    accountId: account.id,
    name: projectName,
    productionBranch: "trunk",
    deploymentConfigs: {
      production: {
        compatibilityDate: "2023-09-29",
        ...productionConfiguration,
      },
    },
  });

  const record = new cloudflare.Record(`${projectName}/dns-record`, {
    zoneId: zone.id,
    name: recordName,
    type: "CNAME",
    value: pages.domains[0],
    ttl: 1,
    proxied: true,
  }, { dependsOn: [zone, pages] });

  const domain = new cloudflare.PagesDomain(`${projectName}/pages-domain`, {
    accountId: account.id,
    domain: record.hostname,
    projectName: pages.name,
  }, { dependsOn: [record] });

  return { pages, record, domain };
}

export function createRedirect(account, zone, recordName, projectName, target) {
  registerRedirectRecords(projectName, zone, recordName);

  return [target.apply(x => `${recordName}.${x}`), target.apply(x => `https://${x}`)];
}
