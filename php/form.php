<?php
function http_post($url, $data_string) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'X-AjaxPro-Method:ShowList',
        'Content-Type: application/json; charset=utf-8',
        'Content-Length: ' . strlen($data_string))
        );
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    $data = curl_exec($ch);
    
    $errorno = curl_errno($ch);
    if ($errorno) {
        return ['respCode'=> false, 'errMsg' => 'curl error, no is '.$errorno];
    }
    
    curl_close($ch);
    return ['respCode'=> true, 'errMsg' => 'curl success', 'data' => json_decode($res, true)];
}

header("content-type:application/json");
    $dsn="mysql:host=rm-2ze70f3702b22ghm0zi.mysql.rds.aliyuncs.com;dbname=test;charset=utf8";
    $bodyData = @file_get_contents('php://input');
    $formData = json_decode($bodyData,true);
    if(!isset($formData['userInfo']) || !isset($formData['tel']) 
        || !isset($formData['province']) || !isset($formData['city']) || !isset($formData['adress'])) {
        echo json_encode(['status' => 1, 'msg' => '请填写名字，电话，地址等信息']);
    } else {
        
        try{
            $pdo            = new PDO($dsn, 'dongchang_master', 'dongchang_master_2016');
            $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $name         = $formData['userInfo'];
            $tel              = $formData['tel'];
            $province   = $formData['province'];
            $city            = $formData['city'];
            $adress      = $formData['adress'];
            $headImg   = $formData['headImg'];
            $openId      = $formData['wxId'];
            
            // add fields
            $province_id   = $formData['provinceCode']??'110000';
            $city_id            = $formData['cityCode']??'110100';
            $adress_id         = $formData['adressCode']??'60570L';
            
            //has added
            $sql = "select * from bed where open_id = '{$openId}'";
            $query = $pdo->query($sql);
            if($query->rowCount() > 0) { // Record has added, to update the data.
                $row=$query->fetch();
                
                $sql = "update bed set `tel`='{$tel}',`province`='{$province}',`city`='{$city}'";
                if($pdo->query($sql)) {
                    echo json_encode(['status' => 0, 'msg' => '重新提交成功', 'data'=>$row['dhm']]);
                } else {
                    echo json_encode(['status' => 0, 'msg' => '你已经提交过了', 'data'=>$row['dhm']]);
                }
            } else {
                $sql = "insert into bed(`name`,`tel`,`province`,`city`,`adress`,`province_id`,`city_id`,`adress_id`, `head_img`, `open_id`)
                values('{$name}','{$tel}','{$province}','{$city}','{$adress}','{$province_id}','{$city_id}','{$adress_id}', '{$headImg}', '{$openId}')";
                
                $pdo->query($sql);
                
                $insert_id = $pdo->lastInsertId();
                
                if($insert_id) {
                    //生成8位码
                    $beginCode = 10000000;
                    $dhmCode   = ($beginCode + $insert_id);
                    $sql = "update bed set dhm={$dhmCode} where id = {$insert_id}";
                    $isUpdate = $pdo->exec($sql);
                    if($isUpdate) {
                        echo json_encode(['status' => 0, 'msg' => '成功', 'data'=>$dhmCode]);
                    } else {
                        echo json_encode(['status' => 1, 'msg' => '获取兑换码失败，重新提交']);
                    }
                } else {
                    echo json_encode(['status' => 1, 'msg' => '执行失败'.$sql]);
                }
            }
        }
        catch(Exception $e)
        {
            echo json_encode(['status' => 1, 'msg' => $e->getMessage()]);
        }
    }
    exit();