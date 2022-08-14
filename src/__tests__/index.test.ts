import test from "ava";
import esmock from "esmock";
import { fileURLToPath } from "url";

import type * as indexType from "../index.js";

const expectedHostname = "my-machine";

test("using absolute path", async (t) => {
    const indexModule = await esmock(fileURLToPath(new URL("../index.js", import.meta.url)), {
        os: {
            hostname: () => expectedHostname,
        },
    });

    const getHostname: typeof indexType.getHostname = indexModule.getHostname;
    t.is(getHostname(), expectedHostname);
});

test("using relative path", async (t) => {
    const indexModule = await esmock("../index.js", {
        os: {
            hostname: () => expectedHostname,
        },
    });

    const getHostname: typeof indexType.getHostname = indexModule.getHostname;
    t.is(getHostname(), expectedHostname);
});
