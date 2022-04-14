const GenerateBarChartData = (data, userDate) => {
    let curr_date = new Date();
    const arr = data;
    const final = [];

    while (
        curr_date.toLocaleString().split(",")[0] !=
        userDate
    ) {
        let expenses = [];
        let total = 0;
        for (let j = 0; j < arr.length; j++) {
            if (
                arr[j].added_on.split(",")[0] ==
                curr_date.toLocaleString().split(",")[0]
            ) {
                expenses.push(arr[j]);
                total = total + Number(arr[j].cost);
            }
        }



        final.push({ curr_date, expenses, total });

        curr_date.setDate(curr_date.getDate() - 1);
        console.log(final, "************** FINAL ********************");
    }

    return {
        final,
        final_totals
    };
}

const setExpense = () => {
    let curr_date = new Date();
    const arr = props.expenses;
    const final = [];

    while (
        curr_date.toLocaleString().split(",")[0] !=
        props.isUserValid.reg_on.split(",")[0]
    ) {
        let expenses = [];
        let total = 0;
        for (let j = 0; j < arr.length; j++) {
            if (
                arr[j].added_on.split(",")[0] ==
                curr_date.toLocaleString().split(",")[0]
            ) {
                expenses.push(arr[j]);
                total = total + Number(arr[j].cost);
            }
        }

        final.push({ expenses, total });

        curr_date.setDate(curr_date.getDate() - 1);
        console.log(final, "************** FINAL ********************");
    }

    // this.setState(
    //   {
    //     allData: final,
    //     allDataTotal: final_totals,
    //     user_mode: props.isUserValid.app_mode,
    //   },
    //   () => {

    //   }
    // );
};