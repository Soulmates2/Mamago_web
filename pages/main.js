import fetch from "isomorphic-unfetch";
import CustomButton from "../components/CustomButton";
import { useState } from "react";

const Index = props => {
  const { show } = props;
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>안녕, Next.js</h1>
      <h1>Data: {props.show.data}</h1>
      <CustomButton name="더하기" onClick={e => setCount(prev => prev + 1)} />
      <div>count: {count}</div>
    </div>
  );
};

Index.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3030`);
  const show = await res.json();

  return { show };
};

export default Index;
