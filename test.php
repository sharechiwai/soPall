<?php
//$data = array("name" => "Hagrid", "age" => "36");                                                                    
//$data_string = json_encode($data);                                                                                   
  $data = '{"channel": "#webhooksample", "username": "webhookbot", "text": "This is posted to #webhooksample and comes from a bot named webhookbot.", "icon_emoji": ":ghost:", "attachments":[{"text":"Choose a game to play","color":"#3AA3E3","fallback": "You are unable to choose a game",attachment_type": "default"},"actions": [{"name": "chess","text": "Chess","type": "button","value": "chess"},{"name": "maze","text": "Falkens Maze","type": "button","value": "maze"},{"name": "war","text": "Thermonuclear War","style": "danger","type": "button","value": "war","confirm": {"title":"Are you sure?","text": "Wouldnt you prefer a good game of chess?","ok_text": "Yes","dismiss_text": "No"}]}]}';                                                                                                                   
$ch = curl_init('https://hooks.slack.com/services/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');                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, json_decode($data));                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: ' . strlen($data))                                                                       
);                                                                                                                   
                                                                                                                     
$result = curl_exec($ch);
var_dump($result);