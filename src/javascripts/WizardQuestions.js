document.wizdata = {
	wizard:{
		nav:[
			{
				question:"Are you a WA Local?",
				layers:[],
				next:{
					nav:[
						{
							question:"Getting Around",
							layers:[],
							next:{
								choice:[
									{
										label:"Do you ride a bicycle?",
										layers:["09372590152434720789-14689280532638025030"]
									},
									{
										label:"Do you use public transport?",
										layers:["09372590152434720789-13313542664337428076", "09372590152434720789-02406381474707693508", "09372590152434720789-18334593804525489987"]
									},
									{
										label:"Do you drive a car?",
										layers:["09372590152434720789-00934723860504938151"]
									}
								]
							}
						},
						{
							question:"Find an Area to Live",
							layers:[],
							next:{
								choice:[
									{
										label:"Do you intend to install a Garden Bore?",
										layers:["09372590152434720789-01302480197074991316", "09372590152434720789-01595251729696585091"]
									},
									{
										label:"Are you interested in seeing the Electoral areas?",
										layers:["09372590152434720789-07805245591538660512"]
									},
									{
										label:"Are you interested in Future Road Developments?",
										layers:["09372590152434720789-08761509449522039995"]
									},
                  {
										label:"Are you worried about flood areas?",
										layers:["09372590152434720789-18350116626117757948"]
									},
                  {
										label:"Are you interested in who lives around you?",
										layers:["09372590152434720789-12830528591563949894"]
									}
								]
							}
						},
						{
							question:"The Environment",
							layers:[],
							next:{
								choice:[
									{
										label:"Are you interested in water demand and source throughout WA?",
										layers:["09372590152434720789-10740193452754088647", "09372590152434720789-01064970710144667276"]
									},
									{
										label:"Are you interested in the location of sensitive ecosystems throughout WA?",
										layers:["09372590152434720789-01627525817521224070"]
									}
								]
							}
						}
					]
        }
			},
			{
				question:"Are you travelling around WA?",
				layers:[],
				next:{
					nav:[
						{
							question:"Things to See",
							layers:[],
							next:{
								choice:[
									{
										label:"Do you want to see local stories?",
										layers:["LocalStories", "Pixtory"]
									},
									{
										label:"Do you use public transport?",
										layers:["09372590152434720789-13313542664337428076", "09372590152434720789-02406381474707693508", "09372590152434720789-18334593804525489987"]
									}
								]
							}
						},
						{
							question:"Getting Around",
							layers:[],
							next:{
								choice:[
									{
										label:"Do you ride a bicycle?",
										layers:["09372590152434720789-14689280532638025030"]
									},
									{
										label:"Do you use public transport?",
										layers:["09372590152434720789-13313542664337428076", "09372590152434720789-02406381474707693508", "09372590152434720789-18334593804525489987"]
									},
									{
										label:"Do you drive a car?",
										layers:["09372590152434720789-00934723860504938151"]
									}
								]
							}
						},
					]
        }
			},
			{
				question:"Are you interested in Indigenous Culture?",
				layers:[],
				next:{
					nav:[
						{
							question:"Where?",
							layers:[],
							next:{
								choice:[
									{
										label:"Are you interested in the location of Indigenous Communities?",
										layers:["09372590152434720789-08518116787816413147"]
									},
									{
										label:"Are you interested in the location of Indigenous Heritage Areas?",
										layers:["09372590152434720789-05162399680694933506"]
									}
								]
							}
						},
						{
							question:"History",
							layers:[],
							next:{
								choice:[
									{
										label:"Are you interested in learning about Noongar-derived suburb names?",
										layers:["NOONGAR SUBURBS MARKERS"]
									}
								]
							}
						}
					]
        }
			}
		]
	}
};
