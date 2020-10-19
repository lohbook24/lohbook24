<?php
class LichKing{
    private $dataFile;
	private $delimiter;

    public function __construct()
    {
        $this->dataFile = "tchrs.txt";
        $this->delimiter = "---";

        if(isset($_GET['snowdan'])){
            if($_GET['snowdan'] == 'ad'){
                $this->getInfo();
            }
        }

        if(isset($_GET['teacher'])){
            $teacherInfo = [
                $_GET['teacher'],
                $_GET['group']
            ];

            if(strlen($teacherInfo[0])){
                $this->addTeacher($teacherInfo);
            }
        }

    }

   private function addTeacher($teacher){
        $writeTime = date(DATE_ATOM);
	   
        $str = $teacher[0] . $this->delimiter . $writeTime . $this->delimiter . $teacher[1] . PHP_EOL;

       $handle = fopen($this->dataFile, "a");
       fwrite($handle, $str);
       fclose($handle);
   }

   private function getInfo(){
        $tableStart = "<tr><td>";
	   	$tableMid = "</td><td>";
        $tableEnd = "</td></tr>";

        $teachers = file($this->dataFile);
	   
	   	readfile("https://so2niko.github.io/lohbook/LBLogStart.html");
        
	   	foreach(array_reverse($teachers) as $val){
			
            $arr = explode($this->delimiter, $val);
            if(count($arr) < 3){
                $arr[2] = "No Group";
            }

            $commentTime = strtotime($arr[1]);
            
			echo $tableStart . $arr[0] . $tableMid . $arr[2] . $tableMid . date('H:i', $commentTime) . $tableMid . date('Y M d', $commentTime) . $tableEnd;
        }
	   
	   
		readfile("https://so2niko.github.io/lohbook/LBLogEnd.html");
   }


}

$lk = new LichKing();

?>