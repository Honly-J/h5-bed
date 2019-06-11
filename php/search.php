<?php 
$keyword = trim($_POST['keyword']);

$dsn="mysql:host=rm-2ze70f3702b22ghm0zi.mysql.rds.aliyuncs.com;dbname=test;charset=utf8";
$pdo            = new PDO($dsn, 'dongchang_master', 'dongchang_master_2016');
$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

$sql = "select * from bed";
if('' != $keyword) {
    $sql .= " where name like '%{$keyword}%' or dhm like '%{$keyword}%'";
}
$bedList = $pdo->query($sql)->fetchAll();

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>查询</title>
  <link href="https://cdn.bootcss.com/twitter-bootstrap/3.0.1/css/bootstrap.min.css" rel="stylesheet">
  <!-- <scrpit src="https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js"></scrpit> -->
  <style>
  *{margin:0; padding:0;}
  .rows{padding:10px 20px;}
  .pointer,.btn{cursor: pointer;}
  .pt30{padding: 20px 0;}
  </style>
  <script>
    function checktheform(){
      var $input =  document.getElementById('keyword')
      if($input.value === '') {
        alert('请输入查询关键字')
        $input.focus()
        return false
      }
      $input.value = $input.value.replace(/</g,'&lt;').replace(/>/g,'&gt;')
      return true
    }

  </script>
</head>
<body>
  <div class="rows">
      <h3 class="text-center">兑奖记录</h3>
      <div class="row">
        <form class="form-inline" name="seachform" method="post" action="./search.php">
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" id="keyword" name="keyword" placeholder="输入关键字">
              <div class="input-group-addon pointer" id="btn-search" onclick="if(checktheform()){document.forms[0].submit()}">查询</div>
            </div>
          </div>
        </form> 
      </div>
      <div class="pt30">
          <table class="table table-hover">
            <tbody>
            <?php if(!empty($bedList)) {?>
            <?php foreach($bedList as $bed) {?>
              <tr>
                <td><img src="<?= $bed['head_img']?? '';?>" height="50" width="50"></td>
                <td>
                  <div>微信昵称:<span><?= $bed['name']?></span>  </div>
                  <div>兑奖码：<span><?= $bed['dhm']?></span></div>
                </td>
                <td>
                <?php if($bed['is_exchange'] == 1) {?>
                      <button class="btn btn-success" type="button" >✔ 已兑换</button>
                <?php } else {?>
                      <a href="./exchange.php?id=<?= $bed['id']?>" class="btn btn-primary" type="button" >兑换</a>
                <?php }?>
                </td>
              </tr>
              <?php } ?>
              <?php } ?>
            </tbody>
          </table>
      </div>
  </div>
</body>
</html>