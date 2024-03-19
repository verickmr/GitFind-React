import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import { useEffect } from "react";
import bg from "./assets/image.png"

function App() {
  const [user, setUser] = useState("");
  const [CurrentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    if (CurrentUser?.login) {
      (async () => {
        const repoData = await fetch(`https://api.github.com/users/${CurrentUser.login}/repos`)
        const newRepo = await repoData.json()
        if (newRepo.length) {
          setRepos(newRepo)
        }
      })()
    }
  }, [CurrentUser])

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()
    console.log(newUser);
    if (newUser.login) {
      const { avatar_url, name, bio, login } = newUser
      setCurrentUser({ avatar_url, name, bio, login })
    }
    console.log(CurrentUser);
  }
  return (
    <>
      <Header />
      <div className="conteudo">
        <div><img src={bg}alt="background" className="background" /></div>
        
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              placeholder="@usuario"
              onChange={(event) => setUser(event.target.value)}
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {CurrentUser ? (
            <>
              <div className="perfil">
                <img src={CurrentUser.avatar_url} className="profile" alt="" />
                <div>
                  <h3>{CurrentUser.name}</h3>
                  <span>@{CurrentUser.login}</span>
                  <p>{CurrentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
            <section>
              <h4>Repositórios</h4>
              {repos.map((repo) => (
                <ItemList
                  key={repo.id}
                  title={repo.name}
                  description={repo.description}
                />
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
