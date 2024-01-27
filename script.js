document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
   fetchBounties();
}

function fetchBounties() {
   const apiKey = ''; // Add your API key here
   const apiUrl = 'https://api.crackeddevs.com/api/get-jobs';
   const headers = {
      'api-key': apiKey,
   };

   const queryParams = {
      limit: 10,
      page: 1,
      technologies: 'react,typescript',
   };

   const url = `${apiUrl}?${new URLSearchParams(queryParams)}`;

   console.log('Fetching data from:', url);

   fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
         console.log('API Response:', data);

         // Display analytics data on the charts
         displayJobTypeChart(data);
         displaySkillLevelChart(data);
         displayJobLocationChart(data);
      })
      .catch(error => console.error('Error fetching data:', error));
}

function displayJobTypeChart(data) {
   const jobTypeChartCanvas = document.getElementById('jobTypeChart');
   const jobTypeChartContext = jobTypeChartCanvas.getContext('2d');

   const jobTypeCounts = getCounts(data, 'job_type');

   new Chart(jobTypeChartContext, {
      type: 'bar',
      data: {
         labels: Object.keys(jobTypeCounts),
         datasets: [{
            label: 'Job Types',
            data: Object.values(jobTypeCounts),
            backgroundColor: getRandomColorArray(Object.keys(jobTypeCounts).length),
         }],
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
            },
         },
      },
   });
}

function displaySkillLevelChart(data) {
   const skillLevelChartCanvas = document.getElementById('skillLevelChart');
   const skillLevelChartContext = skillLevelChartCanvas.getContext('2d');

   const skillLevelCounts = getCounts(data, 'skill_level');

   new Chart(skillLevelChartContext, {
      type: 'bar',
      data: {
         labels: Object.keys(skillLevelCounts),
         datasets: [{
            label: 'Skill Levels',
            data: Object.values(skillLevelCounts),
            backgroundColor: getRandomColorArray(Object.keys(skillLevelCounts).length),
         }],
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
            },
         },
      },
   });
}

function displayJobLocationChart(data) {
   const jobLocationChartCanvas = document.getElementById('jobLocationChart');
   const jobLocationChartContext = jobLocationChartCanvas.getContext('2d');

   const jobLocationCounts = getCounts(data, 'location_iso');

   new Chart(jobLocationChartContext, {
      type: 'bar',
      data: {
         labels: Object.keys(jobLocationCounts),
         datasets: [{
            label: 'Job Locations',
            data: Object.values(jobLocationCounts),
            backgroundColor: getRandomColorArray(Object.keys(jobLocationCounts).length),
         }],
      },
      options: {
         scales: {
            y: {
               beginAtZero: true,
            },
         },
      },
   });
}

function getCounts(data, property) {
   const labels = data.map(item => item[property] || 'N/A');
   return labels.reduce((counts, label) => {
      counts[label] = (counts[label] || 0) + 1;
      return counts;
   }, {});
}

function getRandomColorArray(length) {
   const colorArray = [];
   for (let i = 0; i < length; i++) {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      colorArray.push(randomColor);
   }
   return colorArray;
}
