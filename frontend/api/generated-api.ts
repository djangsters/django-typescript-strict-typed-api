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
export type AddSchema = {
    x: number;
    y: number;
};
export type ResultSchema = {
    result: number;
};
/**
 * Add
 */
export function helloApiAdd(addSchema: AddSchema, opts?: Oazapfts.RequestOpts) {
    return oazapfts.fetchJson<{
        status: 200;
        data: ResultSchema;
    }>("/api/hello/add", oazapfts.json({
        ...opts,
        method: "POST",
        body: addSchema
    }));
}
