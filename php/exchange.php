<?php 
$id = intval($_GET['id']);
$dsn="mysql:host=rm-2ze70f3702b22ghm0zi.mysql.rds.aliyuncs.com;dbname=test;charset=utf8";
$pdo            = new PDO($dsn, 'dongchang_master', 'dongchang_master_2016');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$sql = "update bed set `is_exchange` = 1 where id={$id}";

$number = $pdo->exec($sql);

$url = "http://bed.adexpress.com.cn/search.php";
echo "<script type='text/javascript'>";
if($number > 0) {
    echo "alert('兑换成功');";
} else {
    echo "alert('兑换失败');";
}
echo "window.location.href='$url'";
echo "</script>"; 

?>
