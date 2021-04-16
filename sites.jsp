<%@page language="java" contentType="text/plain" pageEncoding="UTF-8" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%
String path = "/home/sachin/Documents/CIFDP_FORECAST_2021/inundation/";
String sites[] = {"Cuvu", "Komave", "Korotogo", "MauiBay"};
//String sites[] = {"Cuvu", "Komave", "Korotogo"};
ArrayList<String> res = new ArrayList<String>();
File fpath = new File(path);
for (File f : fpath.listFiles()){
    String fn = f.getName().replaceAll("_", "-").trim();
    for (String s : sites){
        if (fn.contains(s)){
            if (fn.contains("-final.nc") || fn.contains(".png")){               
                res.add(fn.replace("-final.nc", ""));
            }
        }
    } 
}
Collections.sort(res);
for (String r : res) out.println(r);
%>