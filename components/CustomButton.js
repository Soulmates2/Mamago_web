const CustomButton = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>
      <style jsx>
        {`
          button {
            width: 100px;
          }
        `}
      </style>
      {name}
    </button>
  );
};

export default CustomButton;
