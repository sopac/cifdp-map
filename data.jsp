<%@page language="java" contentType="text/plain" pageEncoding="UTF-8" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%
String path = "/home/sachin/Documents/CIFDP_FORECAST_2021/inundation/";
String sites[] = {"Cuvu", "Komave", "Korotogo", "MauiBay"};
ArrayList<String> res = new ArrayList<String>();
File fpath = new File(path);
for (File f : fpath.listFiles()){
    String fn = f.getName().replaceAll("_", "-").replace("Runup-", "").trim();
    for (String s : sites){
        if (fn.contains(s)){
            if (fn.contains("-georef-format.nc") || fn.contains(".png")){               
                res.add(fn.replace("-georef-format.nc", ""));
            }
        }
    } 
}
Collections.sort(res);
for (String r : res) out.println(r);
%>