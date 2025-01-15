package com.test.hike.controller;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/html2canvas")
public class Html2CanvasProxyController {
    @ResponseBody
    @GetMapping("/proxy")
    public byte[] html2canvasProxy(HttpServletRequest req) {
        byte[] data = null;
        try {
            URL url = new URL(URLDecoder.decode(req.getParameter("url"), StandardCharsets.UTF_8));

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            if (connection.getResponseCode() == 200) {
                data = IOUtils.toByteArray(connection.getInputStream());
            } else {
                System.out.println("responseCode : " + connection.getResponseCode());
            }
        } catch (MalformedURLException e) {
            data = "wrong URL".getBytes(java.nio.charset.StandardCharsets.UTF_8);
        } catch (Exception e) {
            System.out.println(e);
        }
        return data;
    }
}