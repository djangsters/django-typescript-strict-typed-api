/**
 * NinjaAPI
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "/",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {};
/**
 * Add
 */
export function djangoreactUrlsAdd(a: number, b: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchText(`/api/add${QS.query(QS.explode({
        a,
        b
    }))}`, {
        ...opts
    });
}
