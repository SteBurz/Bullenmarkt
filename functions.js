//Formular of Calculator
	$(document).ready(function()
	{

		'use strict';

		$('#submit').on("click", function() 
		{

			//get data out of formular-fields of the html as a number
			//except for "choice"
			let aktKurs 	= +$('#aktKurs').val();
			let gebuehren 	= +$('#gebuehren').val();
			let invest 		= +$('#invest').val();
			let ziel 		= +$('#ziel').val();
			let choice		= $('#choice').val();

			//variables for the calculate
			let anzahl 		= invest / aktKurs;
			let kursZiel 	= 0;
			let gewinn 		= 0;
			let prozent		= 0;

			//get value of choice and check ifs "Gewinn"
			if(choice === "Gewinn")
			{
				//calculates the price for the stock
				kursZiel 	= (((ziel + invest) / anzahl) + (gebuehren / anzahl)).toFixed(2);
				prozent		= (((100 / aktKurs) * kursZiel) - 100).toFixed(2);
				
				//If kursZiel and aktKurs are the same value
				if (kursZiel >= aktKurs)
				{
					//return this html
				   	$('#kursZiel').html("Die Aktie muss einen Kurs von <b>" + kursZiel + "€</b> erreichen.");
				    $('#prozent').html("Dies entspricht einem Anstieg von <b>" + prozent + "%</b>.");
				} 
				else
				{
					//otherwise return this html
				    $('#kursZiel').html("Die Aktie muss einen Kurs von <b>" + kursZiel + "€</b> erreichen.");
				    $('#prozent').html("Dies entspricht einem Verlust von <b>" + prozent + "%</b>.");
				}
				    
			}
			//if the value of choice isn´t "Gewinn" --> could be only "kursziel" then execute the else-Block
			else 
			{
				//calculates the expected earnings, if the stockprice is reached
			   	gewinn 		= ((anzahl * ziel) - (gebuehren + invest)).toFixed(2);
			    prozent		= ((100 / aktKurs) * ((gewinn / anzahl) + aktKurs + gebuehren) - 100).toFixed(2);

			    //If the Earnings will be greater than zero
			    if (gewinn >= 0)
				{

					//return this html
				    $('#kursZiel').html("Es wird ein Gewinn von <b>" + gewinn + "€</b> erreicht.");
				    $('#prozent').html("Der Kurs müsste um <b>" + prozent + "%</b> steigen.");
				} 
				else
				{
					//otherwise return this html
				    $('#kursZiel').html("Es wird ein Verlust von <b>" + gewinn + "€</b> erreicht.");

				    //if stockpricing is the same
				    if (ziel == aktKurs)
				    {
				    	//return this html
				    	$('#prozent').html("Der Kurs bleibt unverändert.");
				    }
				    //else if the goal is greater than the stockpricing and the earnings
				    else if (ziel >= aktKurs && gewinn < 0)
				    {
				    	//return this html
				    	$('#prozent').html("Der Kurs müsste um <b>" + prozent + "%</b> steigen.");
				    }
				    //in case the goal is smaller than the stockprice and earnings
				    else if (ziel <= aktKurs && gewinn < 0)
				    {
				    	//return this html
				    	$('#prozent').html("Der Kurs müsste um <b>" + prozent + "%</b> fallen.");
				    }	
				}
			}
		})
	})
