$(document).ready(function() {
		var puzzleWidth=3;
		var imgWidth=480;
		var puzzle=$('#puzzle');
		var position={};

 		
		$("#easy").click(function() {puzzleWidth=3;reset();$("#shuffle").click();	});
		$("#normal").click(function() {puzzleWidth=4;reset();$("#shuffle").click();	});
		$("#hard").click(function() {puzzleWidth=5;reset();$("#shuffle").click();	});

		function reset(){
			position={};
			puzzle.empty();

			for (var i = 0; i < puzzleWidth*puzzleWidth; i++) {
			puzzle.append('<div class="picCell" id="pic'+i+'" ondragstart="return false;"><img src="img/puzzle'+puzzleWidth+'.jpg"></div>');
			var row=parseInt(i/puzzleWidth);
			var col=i%puzzleWidth;
			$("#pic"+i+" img").css({
				'margin-left': col*-imgWidth/puzzleWidth + 1,
				'margin-top': row*-imgWidth/puzzleWidth + 1,
				
			});

			position[i]={row:row,col:col}; 
		} 
		$("#pic0 img").remove();
 		$(".picCell").css({
 			width: imgWidth/puzzleWidth-2,
 			height: imgWidth/puzzleWidth-2
 		});


			$(".picCell").click(function() {
				var cells=$("#puzzle div");
				var i =cells.index(this);
				var check=getNearPosition(i);
				//console.log("click");
				while(check.length>0){
					var j =check.pop();
					if (cells.eq(j).attr('id')=="pic0") {

						if (i>j) {var k=j;j=i;i=k;}
						var ahead=cells.eq(i);
						var behind=cells.eq(j);
						var behindPrev=behind.prev();

						if (Math.abs(i-j)==1) {
							behind.after(ahead);
						}else{
							ahead.after(behind);
							behindPrev.after(ahead);
						}
						break;
					}

				}		
			});


		}

		reset();
		
	function getNearPosition(i){
		var pool=[];
		var row=position[i].row;
		var col=position[i].col;
		if (row>0)
			pool.push((row-1)*puzzleWidth+col);
		if (row<puzzleWidth)
			pool.push((row+1)*puzzleWidth+col);
		if (col>0)
			pool.push(i-1);
		if (col<puzzleWidth)
			pool.push(i+1);
 
		return pool;
	}	




 		$("#shuffle").click(function() {
 			
 			for (var i = 0; i < 200; i++) {
				var cells=$("#puzzle div");

				var toMove=getNearPosition(cells.index($("#pic0")));
				cells.eq(toMove[parseInt(Math.random()*toMove.length)]).click();
 			}
 		});

 		$("#shuffle").click();	



});