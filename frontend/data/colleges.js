export const colleges = [
  // IITs
  { id: 1, name: "IIT Bombay", type: "IIT", exam: "JEE_ADV", state: "Maharashtra", city: "Mumbai", nirf: 3, fees: 230000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Aerospace"], cutoffs: { General: 67, OBC: 198, SC: 485, ST: 320, EWS: 95 } },
  { id: 2, name: "IIT Delhi", type: "IIT", exam: "JEE_ADV", state: "Delhi", city: "New Delhi", nirf: 2, fees: 210000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Mathematics & Computing"], cutoffs: { General: 54, OBC: 163, SC: 412, ST: 248, EWS: 76 } },
  { id: 3, name: "IIT Madras", type: "IIT", exam: "JEE_ADV", state: "Tamil Nadu", city: "Chennai", nirf: 1, fees: 220000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Engineering Physics"], cutoffs: { General: 89, OBC: 267, SC: 620, ST: 410, EWS: 130 } },
  { id: 4, name: "IIT Kharagpur", type: "IIT", exam: "JEE_ADV", state: "West Bengal", city: "Kharagpur", nirf: 5, fees: 190000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Mining"], cutoffs: { General: 245, OBC: 712, SC: 1250, ST: 890, EWS: 380 } },
  { id: 5, name: "IIT Kanpur", type: "IIT", exam: "JEE_ADV", state: "Uttar Pradesh", city: "Kanpur", nirf: 4, fees: 215000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Mathematics"], cutoffs: { General: 163, OBC: 480, SC: 890, ST: 612, EWS: 240 } },
  { id: 6, name: "IIT Roorkee", type: "IIT", exam: "JEE_ADV", state: "Uttarakhand", city: "Roorkee", nirf: 7, fees: 210000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Biotechnology"], cutoffs: { General: 412, OBC: 1100, SC: 1890, ST: 1340, EWS: 620 } },
  { id: 7, name: "IIT Guwahati", type: "IIT", exam: "JEE_ADV", state: "Assam", city: "Guwahati", nirf: 8, fees: 180000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Design"], cutoffs: { General: 720, OBC: 1890, SC: 2800, ST: 1950, EWS: 1050 } },
  { id: 8, name: "IIT Hyderabad", type: "IIT", exam: "JEE_ADV", state: "Telangana", city: "Hyderabad", nirf: 9, fees: 195000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","AI"], cutoffs: { General: 850, OBC: 2100, SC: 3200, ST: 2400, EWS: 1250 } },

  // NITs
  { id: 9, name: "NIT Trichy", type: "NIT", exam: "JEE_MAIN", state: "Tamil Nadu", city: "Tiruchirappalli", nirf: 10, fees: 145000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Production"], cutoffs: { General: 3200, OBC: 8900, SC: 18000, ST: 14000, EWS: 5200 } },
  { id: 10, name: "NIT Warangal", type: "NIT", exam: "JEE_MAIN", state: "Telangana", city: "Warangal", nirf: 26, fees: 140000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Metallurgy"], cutoffs: { General: 4500, OBC: 12000, SC: 22000, ST: 17000, EWS: 7000 } },
  { id: 11, name: "NIT Surathkal", type: "NIT", exam: "JEE_MAIN", state: "Karnataka", city: "Surathkal", nirf: 18, fees: 135000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Mining"], cutoffs: { General: 5200, OBC: 14000, SC: 25000, ST: 20000, EWS: 8500 } },
  { id: 12, name: "NIT Calicut", type: "NIT", exam: "JEE_MAIN", state: "Kerala", city: "Calicut", nirf: 22, fees: 130000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Architecture"], cutoffs: { General: 5800, OBC: 15500, SC: 28000, ST: 22000, EWS: 9200 } },
  { id: 13, name: "NIT Allahabad", type: "NIT", exam: "JEE_MAIN", state: "Uttar Pradesh", city: "Prayagraj", nirf: 30, fees: 125000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Information Technology"], cutoffs: { General: 7200, OBC: 19000, SC: 33000, ST: 28000, EWS: 11000 } },
  { id: 14, name: "MNIT Jaipur", type: "NIT", exam: "JEE_MAIN", state: "Rajasthan", city: "Jaipur", nirf: 38, fees: 130000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Electrical"], cutoffs: { General: 8500, OBC: 22000, SC: 38000, ST: 32000, EWS: 13000 } },
  { id: 15, name: "NIT Rourkela", type: "NIT", exam: "JEE_MAIN", state: "Odisha", city: "Rourkela", nirf: 21, fees: 120000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Ceramic"], cutoffs: { General: 9000, OBC: 24000, SC: 41000, ST: 35000, EWS: 14000 } },

  // IIITs
  { id: 16, name: "IIIT Hyderabad", type: "IIIT", exam: "JEE_MAIN", state: "Telangana", city: "Hyderabad", nirf: 43, fees: 280000, branches: ["CSE","ECE","Computational Linguistics","Information Technology"], cutoffs: { General: 1800, OBC: 5200, SC: 10500, ST: 8200, EWS: 3000 } },
  { id: 17, name: "IIIT Allahabad", type: "IIIT", exam: "JEE_MAIN", state: "Uttar Pradesh", city: "Prayagraj", nirf: 52, fees: 180000, branches: ["CSE","ECE","IT","Applied Mathematics"], cutoffs: { General: 3800, OBC: 10500, SC: 19500, ST: 15500, EWS: 6000 } },

  // AIIMS
  { id: 18, name: "AIIMS New Delhi", type: "AIIMS", exam: "NEET", state: "Delhi", city: "New Delhi", nirf: 1, fees: 1628, branches: ["MBBS"], cutoffs: { General: 50, OBC: 150, SC: 350, ST: 200, EWS: 75 } },
  { id: 19, name: "AIIMS Jodhpur", type: "AIIMS", exam: "NEET", state: "Rajasthan", city: "Jodhpur", nirf: 15, fees: 1628, branches: ["MBBS"], cutoffs: { General: 350, OBC: 800, SC: 1800, ST: 1200, EWS: 550 } },
  { id: 20, name: "AIIMS Bhopal", type: "AIIMS", exam: "NEET", state: "Madhya Pradesh", city: "Bhopal", nirf: 18, fees: 1628, branches: ["MBBS"], cutoffs: { General: 420, OBC: 950, SC: 2100, ST: 1450, EWS: 650 } },
  { id: 21, name: "AIIMS Rishikesh", type: "AIIMS", exam: "NEET", state: "Uttarakhand", city: "Rishikesh", nirf: 12, fees: 1628, branches: ["MBBS"], cutoffs: { General: 380, OBC: 870, SC: 1950, ST: 1350, EWS: 600 } },

  // Medical Colleges
  { id: 22, name: "Maulana Azad Medical College", type: "Government Medical", exam: "NEET", state: "Delhi", city: "New Delhi", nirf: 3, fees: 12000, branches: ["MBBS","BDS"], cutoffs: { General: 180, OBC: 450, SC: 980, ST: 680, EWS: 280 } },
  { id: 23, name: "Grant Medical College Mumbai", type: "Government Medical", exam: "NEET", state: "Maharashtra", city: "Mumbai", nirf: 7, fees: 25000, branches: ["MBBS"], cutoffs: { General: 850, OBC: 2100, SC: 4500, ST: 3200, EWS: 1350 } },
  { id: 24, name: "Osmania Medical College", type: "Government Medical", exam: "NEET", state: "Telangana", city: "Hyderabad", nirf: 11, fees: 18000, branches: ["MBBS","BDS"], cutoffs: { General: 1200, OBC: 3000, SC: 6500, ST: 4800, EWS: 1900 } },
  { id: 25, name: "Stanley Medical College Chennai", type: "Government Medical", exam: "NEET", state: "Tamil Nadu", city: "Chennai", nirf: 9, fees: 15000, branches: ["MBBS"], cutoffs: { General: 1400, OBC: 3500, SC: 7200, ST: 5400, EWS: 2200 } },

  // Private Engineering
  { id: 26, name: "BITS Pilani", type: "Private", exam: "JEE_MAIN", state: "Rajasthan", city: "Pilani", nirf: 27, fees: 550000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Physics","Mathematics"], cutoffs: { General: 2800, OBC: 7200, SC: 14000, ST: 11000, EWS: 4500 } },
  { id: 27, name: "VIT Vellore", type: "Private", exam: "JEE_MAIN", state: "Tamil Nadu", city: "Vellore", nirf: 11, fees: 380000, branches: ["CSE","ECE","Mechanical","Civil","Biotechnology","AI & ML"], cutoffs: { General: 25000, OBC: 65000, SC: 110000, ST: 85000, EWS: 40000 } },
  { id: 28, name: "Manipal Institute of Technology", type: "Private", exam: "JEE_MAIN", state: "Karnataka", city: "Manipal", nirf: 20, fees: 420000, branches: ["CSE","ECE","Mechanical","Civil","Aeronautical","Biomedical"], cutoffs: { General: 35000, OBC: 90000, SC: 150000, ST: 120000, EWS: 55000 } },

  // More IITs
  { id: 29, name: "IIT Indore", type: "IIT", exam: "JEE_ADV", state: "Madhya Pradesh", city: "Indore", nirf: 16, fees: 200000, branches: ["CSE","ECE","Mechanical","Civil","Metallurgy"], cutoffs: { General: 1450, OBC: 3500, SC: 5200, ST: 3800, EWS: 2100 } },
  { id: 30, name: "IIT BHU Varanasi", type: "IIT", exam: "JEE_ADV", state: "Uttar Pradesh", city: "Varanasi", nirf: 13, fees: 215000, branches: ["CSE","ECE","Mechanical","Chemical","Civil","Mining","Pharmaceutical"], cutoffs: { General: 740, OBC: 2200, SC: 3600, ST: 2700, EWS: 1100 } },
  { id: 31, name: "IIT Gandhinagar", type: "IIT", exam: "JEE_ADV", state: "Gujarat", city: "Gandhinagar", nirf: 23, fees: 205000, branches: ["CSE","ECE","Mechanical","Civil","Chemical"], cutoffs: { General: 1900, OBC: 4500, SC: 7000, ST: 5100, EWS: 2700 } },
  { id: 32, name: "IIT Bhubaneswar", type: "IIT", exam: "JEE_ADV", state: "Odisha", city: "Bhubaneswar", nirf: 28, fees: 200000, branches: ["CSE","ECE","Mechanical","Civil","Earth Sciences"], cutoffs: { General: 2400, OBC: 5800, SC: 8200, ST: 6300, EWS: 3500 } },

  // More NITs
  { id: 33, name: "NIT Karnataka (NITK)", type: "NIT", exam: "JEE_MAIN", state: "Karnataka", city: "Surathkal", nirf: 18, fees: 135000, branches: ["CSE","ECE","Mechanical","Civil","Mining"], cutoffs: { General: 5300, OBC: 14200, SC: 26000, ST: 21000, EWS: 8800 } },
  { id: 34, name: "MNNIT Allahabad", type: "NIT", exam: "JEE_MAIN", state: "Uttar Pradesh", city: "Prayagraj", nirf: 33, fees: 125000, branches: ["CSE","ECE","Mechanical","Civil","Electrical"], cutoffs: { General: 7400, OBC: 19500, SC: 34000, ST: 28500, EWS: 11500 } },
  { id: 35, name: "VNIT Nagpur", type: "NIT", exam: "JEE_MAIN", state: "Maharashtra", city: "Nagpur", nirf: 35, fees: 130000, branches: ["CSE","ECE","Mechanical","Civil","Mining","Metallurgy"], cutoffs: { General: 8800, OBC: 22500, SC: 38500, ST: 32500, EWS: 13500 } },
  { id: 36, name: "NIT Durgapur", type: "NIT", exam: "JEE_MAIN", state: "West Bengal", city: "Durgapur", nirf: 50, fees: 120000, branches: ["CSE","ECE","Mechanical","Civil","Chemical"], cutoffs: { General: 12000, OBC: 30000, SC: 50000, ST: 42000, EWS: 18000 } },
  { id: 37, name: "NIT Patna", type: "NIT", exam: "JEE_MAIN", state: "Bihar", city: "Patna", nirf: 58, fees: 125000, branches: ["CSE","ECE","Mechanical","Civil","Electrical"], cutoffs: { General: 15000, OBC: 38000, SC: 62000, ST: 52000, EWS: 22000 } },

  // More IIITs
  { id: 38, name: "IIIT Bangalore", type: "IIIT", exam: "JEE_MAIN", state: "Karnataka", city: "Bangalore", nirf: 67, fees: 320000, branches: ["CSE","ECE","Digital Society"], cutoffs: { General: 2500, OBC: 6500, SC: 13000, ST: 10000, EWS: 4000 } },
  { id: 39, name: "IIIT Delhi", type: "IIIT", exam: "JEE_MAIN", state: "Delhi", city: "New Delhi", nirf: 71, fees: 300000, branches: ["CSE","ECE","Computational Biology","Maths & Computing"], cutoffs: { General: 2200, OBC: 5800, SC: 11500, ST: 9000, EWS: 3500 } },
  { id: 40, name: "IIIT Gwalior", type: "IIIT", exam: "JEE_MAIN", state: "Madhya Pradesh", city: "Gwalior", nirf: 80, fees: 220000, branches: ["IT","CSE","ECE"], cutoffs: { General: 6500, OBC: 17000, SC: 30000, ST: 25000, EWS: 9500 } },

  // More AIIMS
  { id: 41, name: "AIIMS Bhubaneswar", type: "AIIMS", exam: "NEET", state: "Odisha", city: "Bhubaneswar", nirf: 22, fees: 1628, branches: ["MBBS"], cutoffs: { General: 450, OBC: 1000, SC: 2250, ST: 1500, EWS: 720 } },
  { id: 42, name: "AIIMS Patna", type: "AIIMS", exam: "NEET", state: "Bihar", city: "Patna", nirf: 28, fees: 1628, branches: ["MBBS"], cutoffs: { General: 500, OBC: 1100, SC: 2400, ST: 1650, EWS: 780 } },
  { id: 43, name: "AIIMS Raipur", type: "AIIMS", exam: "NEET", state: "Chhattisgarh", city: "Raipur", nirf: 30, fees: 1628, branches: ["MBBS"], cutoffs: { General: 540, OBC: 1180, SC: 2550, ST: 1800, EWS: 820 } },
  { id: 44, name: "AIIMS Nagpur", type: "AIIMS", exam: "NEET", state: "Maharashtra", city: "Nagpur", nirf: 38, fees: 1628, branches: ["MBBS"], cutoffs: { General: 600, OBC: 1300, SC: 2800, ST: 1950, EWS: 900 } },

  // More Govt Medical Colleges
  { id: 45, name: "JIPMER Puducherry", type: "Government Medical", exam: "NEET", state: "Puducherry", city: "Puducherry", nirf: 4, fees: 8000, branches: ["MBBS"], cutoffs: { General: 200, OBC: 480, SC: 1050, ST: 720, EWS: 320 } },
  { id: 46, name: "King George's Medical University", type: "Government Medical", exam: "NEET", state: "Uttar Pradesh", city: "Lucknow", nirf: 14, fees: 54000, branches: ["MBBS","BDS"], cutoffs: { General: 1100, OBC: 2700, SC: 6000, ST: 4400, EWS: 1700 } },
  { id: 47, name: "Lady Hardinge Medical College", type: "Government Medical", exam: "NEET", state: "Delhi", city: "New Delhi", nirf: 16, fees: 14000, branches: ["MBBS"], cutoffs: { General: 350, OBC: 850, SC: 1850, ST: 1280, EWS: 540 } },
  { id: 48, name: "BJ Medical College Pune", type: "Government Medical", exam: "NEET", state: "Maharashtra", city: "Pune", nirf: 20, fees: 32000, branches: ["MBBS"], cutoffs: { General: 1300, OBC: 3200, SC: 6800, ST: 4900, EWS: 2000 } },
  { id: 49, name: "Madras Medical College", type: "Government Medical", exam: "NEET", state: "Tamil Nadu", city: "Chennai", nirf: 5, fees: 14000, branches: ["MBBS"], cutoffs: { General: 600, OBC: 1500, SC: 3300, ST: 2400, EWS: 950 } },
  { id: 50, name: "AFMC Pune", type: "Government Medical", exam: "NEET", state: "Maharashtra", city: "Pune", nirf: 6, fees: 65000, branches: ["MBBS"], cutoffs: { General: 280, OBC: 700, SC: 1500, ST: 1050, EWS: 420 } },

  // More Private Engineering
  { id: 51, name: "BITS Goa", type: "Private", exam: "JEE_MAIN", state: "Goa", city: "Sancoale", nirf: 45, fees: 530000, branches: ["CSE","ECE","Mechanical","Chemical","Mathematics"], cutoffs: { General: 5500, OBC: 14000, SC: 26000, ST: 21000, EWS: 8500 } },
  { id: 52, name: "BITS Hyderabad", type: "Private", exam: "JEE_MAIN", state: "Telangana", city: "Hyderabad", nirf: 55, fees: 530000, branches: ["CSE","ECE","Mechanical","Civil","Manufacturing"], cutoffs: { General: 7000, OBC: 18000, SC: 32000, ST: 26000, EWS: 11000 } },
  { id: 53, name: "SRM IST Chennai", type: "Private", exam: "JEE_MAIN", state: "Tamil Nadu", city: "Chennai", nirf: 41, fees: 320000, branches: ["CSE","ECE","Mechanical","Civil","Biotechnology","AI & ML"], cutoffs: { General: 42000, OBC: 105000, SC: 175000, ST: 140000, EWS: 65000 } },

  // More IITs (newer)
  { id: 54, name: "IIT Mandi", type: "IIT", exam: "JEE_ADV", state: "Himachal Pradesh", city: "Mandi", nirf: 31, fees: 200000, branches: ["CSE","ECE","Mechanical","Civil","Bioengineering"], cutoffs: { General: 2900, OBC: 6800, SC: 8400, ST: 6100, EWS: 4000 } },
  { id: 55, name: "IIT Patna", type: "IIT", exam: "JEE_ADV", state: "Bihar", city: "Patna", nirf: 35, fees: 195000, branches: ["CSE","ECE","Mechanical","Civil","Chemical"], cutoffs: { General: 3100, OBC: 7400, SC: 9200, ST: 6800, EWS: 4500 } },
  { id: 56, name: "IIT Ropar", type: "IIT", exam: "JEE_ADV", state: "Punjab", city: "Rupnagar", nirf: 19, fees: 200000, branches: ["CSE","ECE","Mechanical","Civil","Chemical","Mathematics"], cutoffs: { General: 2200, OBC: 5400, SC: 7600, ST: 5600, EWS: 3200 } },
  { id: 57, name: "IIT Jodhpur", type: "IIT", exam: "JEE_ADV", state: "Rajasthan", city: "Jodhpur", nirf: 32, fees: 195000, branches: ["CSE","ECE","Mechanical","Bioengineering"], cutoffs: { General: 2700, OBC: 6300, SC: 8800, ST: 6400, EWS: 3900 } },
  { id: 58, name: "IIT Tirupati", type: "IIT", exam: "JEE_ADV", state: "Andhra Pradesh", city: "Tirupati", nirf: 41, fees: 195000, branches: ["CSE","ECE","Mechanical","Civil","Chemical"], cutoffs: { General: 3800, OBC: 9000, SC: 11000, ST: 8200, EWS: 5500 } },
  { id: 59, name: "IIT Palakkad", type: "IIT", exam: "JEE_ADV", state: "Kerala", city: "Palakkad", nirf: 45, fees: 195000, branches: ["CSE","ECE","Mechanical","Civil"], cutoffs: { General: 4100, OBC: 9600, SC: 11500, ST: 8700, EWS: 5900 } },
  { id: 60, name: "IIT Dharwad", type: "IIT", exam: "JEE_ADV", state: "Karnataka", city: "Dharwad", nirf: 48, fees: 195000, branches: ["CSE","ECE","Mechanical","Civil"], cutoffs: { General: 4300, OBC: 9900, SC: 11800, ST: 9000, EWS: 6200 } },
  { id: 61, name: "IIT Goa", type: "IIT", exam: "JEE_ADV", state: "Goa", city: "Ponda", nirf: 49, fees: 195000, branches: ["CSE","ECE","Mechanical","Mathematics"], cutoffs: { General: 4500, OBC: 10200, SC: 12100, ST: 9300, EWS: 6500 } },
  { id: 62, name: "IIT Jammu", type: "IIT", exam: "JEE_ADV", state: "Jammu & Kashmir", city: "Jammu", nirf: 51, fees: 195000, branches: ["CSE","ECE","Mechanical","Civil","Materials"], cutoffs: { General: 4800, OBC: 10800, SC: 12500, ST: 9600, EWS: 6800 } },
  { id: 63, name: "IIT Bhilai", type: "IIT", exam: "JEE_ADV", state: "Chhattisgarh", city: "Bhilai", nirf: 53, fees: 195000, branches: ["CSE","ECE","Mechanical","Data Science"], cutoffs: { General: 5200, OBC: 11500, SC: 13000, ST: 10000, EWS: 7200 } },

  // More NITs
  { id: 64, name: "MANIT Bhopal", type: "NIT", exam: "JEE_MAIN", state: "Madhya Pradesh", city: "Bhopal", nirf: 65, fees: 130000, branches: ["CSE","ECE","Mechanical","Civil","Electrical","Chemical"], cutoffs: { General: 10500, OBC: 26000, SC: 44000, ST: 38000, EWS: 16000 } },
  { id: 65, name: "NIT Silchar", type: "NIT", exam: "JEE_MAIN", state: "Assam", city: "Silchar", nirf: 47, fees: 120000, branches: ["CSE","ECE","Mechanical","Civil","Electrical"], cutoffs: { General: 13000, OBC: 33000, SC: 54000, ST: 46000, EWS: 19500 } },
  { id: 66, name: "NIT Hamirpur", type: "NIT", exam: "JEE_MAIN", state: "Himachal Pradesh", city: "Hamirpur", nirf: 92, fees: 125000, branches: ["CSE","ECE","Mechanical","Civil","Architecture"], cutoffs: { General: 14000, OBC: 35000, SC: 58000, ST: 49000, EWS: 21000 } },
  { id: 67, name: "NIT Kurukshetra", type: "NIT", exam: "JEE_MAIN", state: "Haryana", city: "Kurukshetra", nirf: 53, fees: 125000, branches: ["CSE","ECE","Mechanical","Civil","Electrical"], cutoffs: { General: 9800, OBC: 24500, SC: 41000, ST: 35000, EWS: 14500 } },
  { id: 68, name: "NIT Jalandhar", type: "NIT", exam: "JEE_MAIN", state: "Punjab", city: "Jalandhar", nirf: 46, fees: 125000, branches: ["CSE","ECE","Mechanical","Civil","Industrial"], cutoffs: { General: 10200, OBC: 25500, SC: 42500, ST: 36000, EWS: 15000 } },
  { id: 69, name: "NIT Meghalaya", type: "NIT", exam: "JEE_MAIN", state: "Meghalaya", city: "Shillong", nirf: 100, fees: 115000, branches: ["CSE","ECE","Mechanical","Civil"], cutoffs: { General: 18000, OBC: 42000, SC: 68000, ST: 58000, EWS: 25000 } },
  { id: 70, name: "NIT Sikkim", type: "NIT", exam: "JEE_MAIN", state: "Sikkim", city: "Ravangla", nirf: 110, fees: 115000, branches: ["CSE","ECE","Mechanical","Civil"], cutoffs: { General: 20000, OBC: 46000, SC: 72000, ST: 62000, EWS: 28000 } },
  { id: 71, name: "NIT Goa", type: "NIT", exam: "JEE_MAIN", state: "Goa", city: "Farmagudi", nirf: 90, fees: 125000, branches: ["CSE","ECE","Mechanical","Civil"], cutoffs: { General: 12000, OBC: 30000, SC: 50000, ST: 42000, EWS: 18000 } },
  { id: 72, name: "NIT Puducherry", type: "NIT", exam: "JEE_MAIN", state: "Puducherry", city: "Karaikal", nirf: 95, fees: 120000, branches: ["CSE","ECE","Mechanical","Civil"], cutoffs: { General: 14500, OBC: 36000, SC: 56000, ST: 48000, EWS: 22000 } },
  { id: 73, name: "NIT Mizoram", type: "NIT", exam: "JEE_MAIN", state: "Mizoram", city: "Aizawl", nirf: 115, fees: 115000, branches: ["CSE","ECE","Mechanical","Civil"], cutoffs: { General: 22000, OBC: 48000, SC: 75000, ST: 65000, EWS: 30000 } },

  // More IIITs
  { id: 74, name: "IIIT Pune", type: "IIIT", exam: "JEE_MAIN", state: "Maharashtra", city: "Pune", nirf: 78, fees: 200000, branches: ["CSE","ECE","IT"], cutoffs: { General: 8500, OBC: 22000, SC: 38000, ST: 32000, EWS: 13000 } },
  { id: 75, name: "IIIT Sri City", type: "IIIT", exam: "JEE_MAIN", state: "Andhra Pradesh", city: "Sri City", nirf: 85, fees: 280000, branches: ["CSE","ECE","Data Engineering"], cutoffs: { General: 11000, OBC: 28000, SC: 46000, ST: 39000, EWS: 16500 } },
  { id: 76, name: "IIIT Vadodara", type: "IIIT", exam: "JEE_MAIN", state: "Gujarat", city: "Vadodara", nirf: 95, fees: 200000, branches: ["CSE","ECE","IT"], cutoffs: { General: 13500, OBC: 32000, SC: 52000, ST: 44000, EWS: 19000 } },
  { id: 77, name: "IIIT Lucknow", type: "IIIT", exam: "JEE_MAIN", state: "Uttar Pradesh", city: "Lucknow", nirf: 88, fees: 195000, branches: ["IT","CSE","CSE-Cyber Security"], cutoffs: { General: 9200, OBC: 24000, SC: 41000, ST: 35000, EWS: 14000 } },
  { id: 78, name: "IIIT Kalyani", type: "IIIT", exam: "JEE_MAIN", state: "West Bengal", city: "Kalyani", nirf: 105, fees: 190000, branches: ["CSE","ECE"], cutoffs: { General: 14000, OBC: 33000, SC: 53000, ST: 45000, EWS: 20000 } },
  { id: 79, name: "IIIT Nagpur", type: "IIIT", exam: "JEE_MAIN", state: "Maharashtra", city: "Nagpur", nirf: 99, fees: 200000, branches: ["CSE","ECE"], cutoffs: { General: 12000, OBC: 30000, SC: 49000, ST: 41000, EWS: 18000 } },
  { id: 80, name: "IIIT Una", type: "IIIT", exam: "JEE_MAIN", state: "Himachal Pradesh", city: "Una", nirf: 120, fees: 190000, branches: ["CSE","ECE","IT"], cutoffs: { General: 16000, OBC: 38000, SC: 60000, ST: 51000, EWS: 23000 } },

  // More AIIMS
  { id: 81, name: "AIIMS Rishikesh", type: "AIIMS", exam: "NEET", state: "Uttarakhand", city: "Rishikesh", nirf: 21, fees: 1628, branches: ["MBBS"], cutoffs: { General: 400, OBC: 920, SC: 2050, ST: 1400, EWS: 640 } },
  { id: 82, name: "AIIMS Mangalagiri", type: "AIIMS", exam: "NEET", state: "Andhra Pradesh", city: "Mangalagiri", nirf: 45, fees: 1628, branches: ["MBBS"], cutoffs: { General: 720, OBC: 1500, SC: 3100, ST: 2200, EWS: 1050 } },
  { id: 83, name: "AIIMS Bibinagar", type: "AIIMS", exam: "NEET", state: "Telangana", city: "Bibinagar", nirf: 50, fees: 1628, branches: ["MBBS"], cutoffs: { General: 850, OBC: 1750, SC: 3500, ST: 2500, EWS: 1200 } },
  { id: 84, name: "AIIMS Kalyani", type: "AIIMS", exam: "NEET", state: "West Bengal", city: "Kalyani", nirf: 55, fees: 1628, branches: ["MBBS"], cutoffs: { General: 1000, OBC: 2000, SC: 3900, ST: 2800, EWS: 1400 } },
  { id: 85, name: "AIIMS Gorakhpur", type: "AIIMS", exam: "NEET", state: "Uttar Pradesh", city: "Gorakhpur", nirf: 60, fees: 1628, branches: ["MBBS"], cutoffs: { General: 1150, OBC: 2250, SC: 4200, ST: 3100, EWS: 1600 } },
  { id: 86, name: "AIIMS Deoghar", type: "AIIMS", exam: "NEET", state: "Jharkhand", city: "Deoghar", nirf: 75, fees: 1628, branches: ["MBBS"], cutoffs: { General: 1350, OBC: 2600, SC: 4800, ST: 3500, EWS: 1900 } },
  { id: 87, name: "AIIMS Bathinda", type: "AIIMS", exam: "NEET", state: "Punjab", city: "Bathinda", nirf: 70, fees: 1628, branches: ["MBBS"], cutoffs: { General: 1250, OBC: 2400, SC: 4500, ST: 3300, EWS: 1750 } },
  { id: 88, name: "AIIMS Rajkot", type: "AIIMS", exam: "NEET", state: "Gujarat", city: "Rajkot", nirf: 80, fees: 1628, branches: ["MBBS"], cutoffs: { General: 1500, OBC: 2800, SC: 5100, ST: 3700, EWS: 2100 } },
  { id: 89, name: "AIIMS Madurai", type: "AIIMS", exam: "NEET", state: "Tamil Nadu", city: "Madurai", nirf: 85, fees: 1628, branches: ["MBBS"], cutoffs: { General: 1650, OBC: 3000, SC: 5400, ST: 3950, EWS: 2300 } },

  // More Govt Medical Colleges
  { id: 90, name: "Vardhman Mahavir Medical College", type: "Government Medical", exam: "NEET", state: "Delhi", city: "New Delhi", nirf: 25, fees: 16000, branches: ["MBBS"], cutoffs: { General: 600, OBC: 1400, SC: 2900, ST: 2100, EWS: 880 } },
  { id: 91, name: "Seth GS Medical College", type: "Government Medical", exam: "NEET", state: "Maharashtra", city: "Mumbai", nirf: 8, fees: 75000, branches: ["MBBS"], cutoffs: { General: 760, OBC: 1900, SC: 4100, ST: 2900, EWS: 1200 } },
  { id: 92, name: "Calcutta Medical College", type: "Government Medical", exam: "NEET", state: "West Bengal", city: "Kolkata", nirf: 12, fees: 9000, branches: ["MBBS","BDS"], cutoffs: { General: 900, OBC: 2200, SC: 4700, ST: 3400, EWS: 1450 } },
  { id: 93, name: "Govt Medical College Thiruvananthapuram", type: "Government Medical", exam: "NEET", state: "Kerala", city: "Thiruvananthapuram", nirf: 19, fees: 28000, branches: ["MBBS"], cutoffs: { General: 1100, OBC: 2700, SC: 5800, ST: 4200, EWS: 1750 } },
  { id: 94, name: "Govt Medical College Surat", type: "Government Medical", exam: "NEET", state: "Gujarat", city: "Surat", nirf: 35, fees: 26000, branches: ["MBBS"], cutoffs: { General: 1950, OBC: 4400, SC: 8500, ST: 6300, EWS: 3000 } },
  { id: 95, name: "Govt Medical College Patiala", type: "Government Medical", exam: "NEET", state: "Punjab", city: "Patiala", nirf: 42, fees: 32000, branches: ["MBBS"], cutoffs: { General: 2150, OBC: 4800, SC: 9200, ST: 6800, EWS: 3300 } },
  { id: 96, name: "Govt Medical College Jaipur (SMS)", type: "Government Medical", exam: "NEET", state: "Rajasthan", city: "Jaipur", nirf: 17, fees: 11000, branches: ["MBBS"], cutoffs: { General: 1050, OBC: 2550, SC: 5500, ST: 4000, EWS: 1650 } },
  { id: 97, name: "Govt Medical College Nagpur", type: "Government Medical", exam: "NEET", state: "Maharashtra", city: "Nagpur", nirf: 36, fees: 34000, branches: ["MBBS"], cutoffs: { General: 1900, OBC: 4300, SC: 8400, ST: 6200, EWS: 2950 } },
  { id: 98, name: "Govt Medical College Trivandrum", type: "Government Medical", exam: "NEET", state: "Kerala", city: "Trivandrum", nirf: 23, fees: 22000, branches: ["MBBS"], cutoffs: { General: 1180, OBC: 2900, SC: 6100, ST: 4400, EWS: 1850 } },
  { id: 99, name: "Lokmanya Tilak Medical College", type: "Government Medical", exam: "NEET", state: "Maharashtra", city: "Mumbai", nirf: 31, fees: 56000, branches: ["MBBS"], cutoffs: { General: 1600, OBC: 3800, SC: 7300, ST: 5300, EWS: 2500 } },

  // More Private Engineering
  { id: 100, name: "Thapar Institute of Engineering", type: "Private", exam: "JEE_MAIN", state: "Punjab", city: "Patiala", nirf: 29, fees: 360000, branches: ["CSE","ECE","Mechanical","Civil","Chemical","Biotechnology"], cutoffs: { General: 18000, OBC: 47000, SC: 80000, ST: 65000, EWS: 28000 } },
  { id: 101, name: "Amrita Vishwa Vidyapeetham", type: "Private", exam: "JEE_MAIN", state: "Tamil Nadu", city: "Coimbatore", nirf: 28, fees: 320000, branches: ["CSE","ECE","Mechanical","Civil","AI"], cutoffs: { General: 28000, OBC: 70000, SC: 115000, ST: 95000, EWS: 44000 } },
  { id: 102, name: "Shiv Nadar University", type: "Private", exam: "JEE_MAIN", state: "Uttar Pradesh", city: "Greater Noida", nirf: 56, fees: 480000, branches: ["CSE","ECE","Mechanical","Mathematics"], cutoffs: { General: 30000, OBC: 75000, SC: 122000, ST: 100000, EWS: 47000 } },
  { id: 103, name: "PES University", type: "Private", exam: "JEE_MAIN", state: "Karnataka", city: "Bangalore", nirf: 65, fees: 410000, branches: ["CSE","ECE","Mechanical","Biotechnology"], cutoffs: { General: 32000, OBC: 80000, SC: 130000, ST: 105000, EWS: 50000 } },
  { id: 104, name: "DTU Delhi", type: "State Govt", exam: "JEE_MAIN", state: "Delhi", city: "New Delhi", nirf: 36, fees: 200000, branches: ["CSE","ECE","Mechanical","Civil","Electrical","IT"], cutoffs: { General: 6800, OBC: 17500, SC: 32000, ST: 26000, EWS: 10500 } },
  { id: 105, name: "NSUT Delhi", type: "State Govt", exam: "JEE_MAIN", state: "Delhi", city: "New Delhi", nirf: 51, fees: 180000, branches: ["CSE","ECE","Mechanical","IT","Biotechnology"], cutoffs: { General: 7500, OBC: 19000, SC: 34000, ST: 28000, EWS: 11500 } },
  { id: 106, name: "IIITDM Jabalpur", type: "IIIT", exam: "JEE_MAIN", state: "Madhya Pradesh", city: "Jabalpur", nirf: 86, fees: 195000, branches: ["CSE","ECE","Mechanical","Design"], cutoffs: { General: 10000, OBC: 26000, SC: 44000, ST: 37000, EWS: 15000 } },
  { id: 107, name: "IIITDM Kancheepuram", type: "IIIT", exam: "JEE_MAIN", state: "Tamil Nadu", city: "Chennai", nirf: 75, fees: 195000, branches: ["CSE","ECE","Mechanical","Smart Manufacturing"], cutoffs: { General: 8800, OBC: 23000, SC: 40000, ST: 33000, EWS: 13500 } },
  { id: 108, name: "ICT Mumbai", type: "State Govt", exam: "JEE_MAIN", state: "Maharashtra", city: "Mumbai", nirf: 24, fees: 90000, branches: ["Chemical","Pharma","Food Engineering","Polymer"], cutoffs: { General: 8000, OBC: 21000, SC: 36000, ST: 30000, EWS: 12500 } },
  { id: 109, name: "Jadavpur University", type: "State Govt", exam: "WBJEE", state: "West Bengal", city: "Kolkata", nirf: 12, fees: 9000, branches: ["CSE","ECE","Mechanical","Civil","Electrical","Chemical"], cutoffs: { General: 350, OBC: 900, SC: 2100, ST: 1600, EWS: 550 } },

  // More State Medical
  { id: 110, name: "BJ Medical College Ahmedabad", type: "Government Medical", exam: "NEET", state: "Gujarat", city: "Ahmedabad", nirf: 33, fees: 17000, branches: ["MBBS"], cutoffs: { General: 1850, OBC: 4100, SC: 8100, ST: 6000, EWS: 2850 } },
  { id: 111, name: "RG Kar Medical College", type: "Government Medical", exam: "NEET", state: "West Bengal", city: "Kolkata", nirf: 40, fees: 9000, branches: ["MBBS"], cutoffs: { General: 2150, OBC: 4800, SC: 9100, ST: 6700, EWS: 3250 } },
  { id: 112, name: "Govt Medical College Aurangabad", type: "Government Medical", exam: "NEET", state: "Maharashtra", city: "Aurangabad", nirf: 60, fees: 38000, branches: ["MBBS"], cutoffs: { General: 2800, OBC: 6200, SC: 11500, ST: 8500, EWS: 4200 } },
  { id: 113, name: "Sawai Man Singh Medical College", type: "Government Medical", exam: "NEET", state: "Rajasthan", city: "Jaipur", nirf: 26, fees: 12000, branches: ["MBBS"], cutoffs: { General: 1080, OBC: 2580, SC: 5550, ST: 4050, EWS: 1680 } },
];

export const getCollegesByExam = (exam) => colleges.filter(c => c.exam === exam || exam === 'ALL');
export const getCollegesByRank = (rank, exam) => {
  return colleges
    .filter(c => exam === 'ALL' || c.exam === exam)
    .filter(c => c.cutoffs.General >= rank * 0.5 && c.cutoffs.General <= rank * 2)
    .sort((a, b) => a.nirf - b.nirf);
};
