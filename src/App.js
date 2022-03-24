import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar"
import RecipeCard from "./components/RecipeCard"

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {

  const [isLoading, setIsloading]= useState(false);
  const [query, setQuery]= useState("");
  const [recipes, setRecipes]= useState([]);

  const searchRecipes = async ()=>{
    setIsloading(true);
    const url = apiUrl + query;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    setRecipes(data.meals);
    setIsloading(false);
  }

  useEffect(()=>{
    searchRecipes();
  }, [])

  const handleSubmit = (e) =>{
 e.preventDefault()
 searchRecipes()
  }
  const reset = async ()=>{
    const url = apiUrl;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    setRecipes(data.meals);
    setQuery("")
  }

  return (
    <div className="container">
      <h2> Cook with our recipes </h2>
      <SearchBar
      handleSubmit={handleSubmit}
      value={query}
      reset={reset}
      onChange={(e)=> setQuery(e.target.value)}
      isLoading={isLoading}
      />
      <div className='recipes'>
        {recipes ? recipes.map((recipe)=>(
          <RecipeCard key={recipe.idMeal} recipe={recipe}/>
        )) : "No Recipes! "}
      </div>
    </div>
  );
}

export default App;
