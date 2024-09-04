import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import styles from './productList.module.css';
import { changeRating, medicineData, searchMedicine } from "./productList.slice";

export const ProductList = () => {
    const dispatch = useDispatch()
    const medicine = useSelector((state) => state.medicine)
    const searchTerm = useSelector((state) => state.searchMedicine)


    const getData = async () => {
        const res = await axios.get("http://localhost:3004/medicine")
        dispatch(medicineData(res.data))
    }

    const handleChange = async (id, newRating) => {

        dispatch(changeRating({ id, rating: newRating }))


        await axios.patch(`http://localhost:3004/medicine/${id}`, { rating: newRating })
    };

    const handleSearchChange = (e) => {
        dispatch(searchMedicine(e.target.value))
    };


    useEffect(() => {
        getData()
    }, [dispatch])


    const filteredMedicine = medicine.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div>
            <h1>Medicine List</h1>
            <div>
                <div className={styles.content}>
                    <input
                        className={styles.inputstyle}
                        placeholder="Find medicine you want..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div style={{ display: "flex", gap: 30 }}>
                    {
                        filteredMedicine.map(elm => (
                            <div className={styles.box} key={elm.id}>
                                <img style={{ width: 110 }} src={elm.picture} />
                                <p>{elm.name}</p>
                                <p> <strong>{elm.price} AMD</strong></p>
                                <div>
                                    {
                                        new Array(5)
                                            .fill(null)
                                            .map((item, i) =>
                                                <img key={i} onClick={() => handleChange(elm.id, i + 1)}
                                                    style={{ width: 40, cursor: "pointer" }}
                                                    src={i < elm.rating
                                                        ? "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png"
                                                        : "https://cdn3.iconfinder.com/data/icons/teenyicons-outline-vol-3/15/star-small-64.png"}
                                                />)
                                    }

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}