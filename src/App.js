import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import Table from "./components/pages/Table/Table";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";
import { fetchStatus } from "./redux/statusRedux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatus()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
