import fetch from "isomorphic-unfetch";

const Index = props => (
  <div>
    <h1>안녕, Next.js</h1>
    <h1>Data: {props.show.data}</h1>
  </div>
);

Index.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3030/`);
  const show = await res.json();

  console.log(`Fetched show: ${show.data}`);
  return { show };
};

export default Index;
