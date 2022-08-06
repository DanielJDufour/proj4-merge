import test from "flug";
import * as proj4 from "proj4";
import proj4FullyLoaded from "proj4-fully-loaded";

import merge from "./proj4-merge";

const expectation = {
  projName: "utm",
  zone: 17,
  datumCode: "WGS84",
  units: "m",
  no_defs: true,
};

test("merge zero", ({ eq }) => {
  let msg;
  try {
    merge();
  } catch (error) {
    msg = error.message;
  }
  eq(msg, "[proj4-merge] merge called with zero instances of proj4");
});

test("merge of 1", ({ eq }) => {
  const merged = merge(proj4);
  // if only pass in 1, should just return it
  eq(merged, proj4);
});

test("merge of 2", ({ eq }) => {
  const merged = merge(proj4, proj4FullyLoaded);
  eq(merged.defs["EPSG:32617"], expectation);
});

test("merge array", ({ eq }) => {
  const merged = merge([proj4, proj4FullyLoaded]);
  eq(merged.defs["EPSG:32617"], expectation);
});

test("merge customized", ({ eq }) => {
  proj4FullyLoaded.defs("TEST", expectation as any);
  const merged = merge([proj4, proj4FullyLoaded]);
  eq(merged.defs["EPSG:32617"], expectation);
  eq(merged.defs["TEST"], expectation);
});

test("merge invalids", ({ eq }) => {
  const merged = merge([{}, proj4, undefined, null, proj4FullyLoaded, false, 0]);
  eq(merged.defs["EPSG:32617"], expectation);
});
