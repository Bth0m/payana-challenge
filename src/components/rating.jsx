const Rating = ({ rate, currentRate, userId, handleResponse, disabled }) => {
  const rateArray = Array.from(Array(rate).keys());

  const handleUserFeedback = (value) =>
    handleResponse && handleResponse(userId, value);
  return (
    <div className="rating">
      {rateArray.map((item, i) => {
        return (
          <input
            type="radio"
            onClick={() => handleUserFeedback(i)}
            className="mask mask-star bg-amber-300"
            checked={item === currentRate}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};
export default Rating;
