var p1_turn = true;
var gameover = false;
var action = true;

function ttt_init()
{
	var imgs = document.querySelectorAll(".imgclass");
	
	if(imgs.length > 0)
	{
		for(var ind0 = 0; ind0 < imgs.length; ind0++)
		{
			imgs[ind0].src="blank_tile.png";
			imgs[ind0].addEventListener( "click", img_clicker);
		}
	}else
	{
		console.log("imgs is empty or undefined");
	}
	document.getElementById("p1score").textContent="0";
	document.getElementById("comscore").textContent="0";
	gameover = false;
	p1_turn = true;
}

var img_clicker = function(event)
{
	if(gameover)
		return;

	var evt_target = event.target;
	
	if(evt_target.src)
	{
		var temp = evt_target.src.slice( evt_target.src.lastIndexOf("/")+1 );

		if(evt_target.src.endsWith("blank_tile.png") && p1_turn)
		{
			evt_target.src = "x_tile.png";
			p1_turn = !p1_turn;
		}else if(!p1_turn && evt_target.src.endsWith("blank_tile.png"))
		{
			evt_target.src = "o_tile.png";
			p1_turn = !p1_turn;
		}	

		var imgs = document.querySelectorAll(".imgclass");
		var score;
		if(p1_turn === true)
		{
			score = document.getElementById("p1score");
		}else
		{
			score = document.getElementById("comscore");
		}

		var sum = 0;
		var max_sum = 0;
		var DIM = 3;

		//now, we're going to count the sum of the rows
		for(var ind = 0; ind < DIM*DIM; ind+=DIM)
		{
			for(var ind0 = ind; ind0 < ind+DIM; ind0++)
				sum += counter(imgs[ind0]);
			
			if(p1_turn)
			{
				if(max_sum < sum)
					max_sum = sum;
			}else
			{
				if(max_sum > sum)
					max_sum = sum;
			}
			
			sum = 0;
		}

		//now, we do the columns
		sum = 0;
		for(var ind = 0; ind < DIM; ind++)
		{
			for(var ind0 = ind; ind0 < ((DIM*DIM) - (DIM - ind - 1) ); ind0+=DIM)
				sum += counter(imgs[ind0]);

			if(p1_turn)
			{
				if(max_sum < sum)
					max_sum = sum;
			}else
			{
				if(max_sum > sum)
					max_sum = sum;
			}
			sum = 0;
		}

		//and now, the diagonals, starting with the left
		
		var ind0 = 0;
		for(var ind = 0; ind < (DIM*DIM); ind+= (DIM+1) )
		{
			sum += counter( imgs[ind] );
			ind0 += (DIM+1);
		}

		if(p1_turn)
		{
			if(max_sum < sum)
				max_sum = sum;
		}else
		{
			if(max_sum > sum)
				max_sum = sum;
		}
		sum = 0;

		//and now the right diagonal
		var ind0 = DIM - 1;
		for(var ind = 0; ind < DIM; ind++)
		{
			sum += counter( imgs[ind0] );
			ind0 += (DIM - 1);
		}

		if(p1_turn)
		{
			if(max_sum < sum)
				max_sum = sum;
		}else
		{
			if(max_sum > sum)
				max_sum = sum;
		}
		sum = 0;

		if(p1_turn)
			score.textContent = max_sum;
		else
			score.textContent = -1*max_sum;


		if(Math.abs(max_sum) >= 3)
		{
			gameover = true;
			end_game();
		}
	}else
	{
		console.log("the element passed to the flip function is not an image");
	}
}

var counter = function(img_el){

	if( img_el.src.endsWith("x_tile.png") )
		return p1_turn?1:0;

	if( img_el.src.endsWith("o_tile.png") )
		return p1_turn?0:-1;

	if( img_el.src.endsWith("blank_tile.png") )
		return 0;
}

var end_game = function(){
	var victor = document.querySelector(".win-class");
	console.log(typeof victor.style.display);
	victor.style.display="block";

}


//debug functions
var introspector = function(obj){

	for(var prop in obj)
	{
		if( typeof obj[prop] !=  'function')
		{
			console.log(prop);
		}
	}
}

ttt_init();