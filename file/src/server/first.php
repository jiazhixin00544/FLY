<?php
//查询数据，找到数据的类信息(在这里，我们想要的是产品的分类信息)
$link = mysqli_connect('localhost','root','root','bk2004');
$sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id` ";
$res = mysqli_query($link,$sql);
$data =mysqli_fetch_all($res,MYSQLI_ASSOC);
// var_dump ($data);
//给前端返回数据
echo json_encode(array(
    'message'=>'已经请求回来一级列表数据',
    'code'=>1,
    'list'=>$data
    
))
?>