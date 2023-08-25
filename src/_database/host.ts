 function hosts() {
    return (process.env.NODE_ENV === "production")?`https://taradb.vercel.app`:`http://localhost:3000`;
}

const host = hosts();
export default host;