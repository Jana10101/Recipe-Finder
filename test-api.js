async function testApi() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API is working!');
    console.log('Number of meals found:', data.meals?.length || 0);
    console.log('First meal:', data.meals?.[0]?.strMeal || 'No meals found');
    console.log('Full first meal object:');
    console.log(JSON.stringify(data.meals?.[0], null, 2));
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

testApi();