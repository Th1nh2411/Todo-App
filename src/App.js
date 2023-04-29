import { Route, Routes } from 'react-router';
import Home from './Pages/HomePage/HomePage';
import TodoPage from './Pages/TodoPage/TodoPage';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/todo"
                    element={
                        <DefaultLayout>
                            <TodoPage />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
