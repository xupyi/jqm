
import request from "@/request.js";

export function wxJsConfig() {
    return request({
        url: "/api/wxShare",
        data: { codeUrl: window.location.href },
        method: "post"
    }).then(res=>res.data)
}