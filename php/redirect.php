<?php
require_once "./jssdk.php";

$appId='wx16a48a4614656e0c';
$appsecret='7809a98746030da7fc1e9e3860738725';


$redirect_uri = urlencode ( 'http://bed.adexpress.com.cn/pp.php');

$url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=$appId&redirect_uri=$redirect_uri&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
header("Location:".$url);

?>
