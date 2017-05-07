/**
 * Created by MacSteffen on 30.04.17.
 */
//Formular of Calculator
$(document).ready(function()
{

    'use strict';

    $('#submit').on("click", function()
    {

        //get data out of formular-fields of the html as a number
        //except for "choice"
        var aktKurs 	= +$('#aktKurs').val();
        var gebuehren 	= +$('#gebuehren').val();
        var invest 		= +$('#invest').val();
        var ziel 		= +$('#ziel').val();
        var choice		= $('input[name=choice]:checked').val();

        //variables for the calculate
        var anzahl 		= invest / aktKurs;
        var kursZiel 	= 0;
        var gewinn 		= 0;
        var prozent		= 0;

        //get value of choice and check ifs "Gewinn"
        if( choice == 'gewinn')
        {
            //calculates the price for the shares
            kursZiel 	= (((ziel + invest) / anzahl) + (gebuehren / anzahl)).toFixed(2);
            prozent		= (((100 / aktKurs) * kursZiel) - 100).toFixed(2);

            //If kursZiel and aktKurs are the same value
            if (kursZiel >= aktKurs)
            {
                //return this html
                $('#kursZiel').html("muss die Aktie einen Kurs von " + kursZiel + "€ erreichen werden.");
                $('#prozent').html("um " + prozent + "% ansteigen.");
            }
            else
            {
                //otherwise return this html
                $('#kursZiel').html("muss die Aktie einen Kurs von " + kursZiel + "€ erreichen werden.");
                $('#prozent').html("um " + prozent + "% fallen.");
            }

        }
        //if the value of choice isn´t "Gewinn" --> could be only "kursziel" then execute the else-Block
        else
        {
            //calculates the expected earnings, if the price of the share is reached
            gewinn 		= ((anzahl * ziel) - (gebuehren + invest)).toFixed(2);
            prozent		= ((100 / aktKurs) * ((gewinn / anzahl) + aktKurs + gebuehren) - 100).toFixed(2);

            //If the Earnings will be greater than zero
            if (gewinn >= 0)
            {

                //return this html
                $('#kursZiel').html("würde ein Gewinn von " + gewinn + "€ erreicht werden.");
                $('#prozent').html("um " + prozent + "% ansteigen.");
            }
            else
            {
                //otherwise return this html
                $('#kursZiel').html("würde ein Verlust von " + gewinn + "€ erreicht werden.");

                //if price of the share is the same
                if (ziel == aktKurs)
                {
                    //return this html
                    $('#prozent').html("unverändert bleiben.");
                }
                //else if the goal is greater than the price of the share and the earnings
                else if (ziel >= aktKurs && gewinn < 0)
                {
                    //return this html
                    $('#prozent').html("um " + prozent + "% ansteigen.");
                }
                //in case the goal is smaller than the price of the share and earnings
                else if (ziel <= aktKurs && gewinn < 0)
                {
                    //return this html
                    $('#prozent').html("um " + prozent + "% fallen.");
                }
            }
        }
    })
});
