

export default function DatePresets(props) {
   const {startDate, endDate, showDateFormat, handlePresets} = props;
   
   Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};
   const today = Date.now();

   const presets = [
    {
      text: "Next Week",
      start: today,
      end: new Date().addDays(7)
    },
    {
      text: "Next Month",
      start: today,
      end: new Date().addDays(30)
    },
    {
      text: "Next 3 Months",
      start: today,
      end: new Date().addDays(90)
    }
   ]
  
  return (
    <div>
      {presets.map(({text, start, end}) => {
        const isChosen = new Date(start) === new Date(startDate) && new Date(end) === new Date(endDate)
        return (
          <button
          key={text}
          type="button"
          className={`btn btn-sm btn-dark ${isChosen ? "btn-success" : "btn-danger"}`}
          style={{marginRight: 12}}
          onClick={() => handlePresets(start, end)}
          >
            {text}
          </button>
        )
      })}
    </div>
   )
}