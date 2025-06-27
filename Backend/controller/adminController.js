export const getAdmin = async (req, res) => {
    try{
        let adminEmail = req.adminEmail; // Extracted from adminAuth middleware
        console.log("Admin Email in getAdmin:", adminEmail);
        if(!adminEmail) {
            return res.status(401).json({ message: "admin not found" });
        }
        return res.status(200).json({ message: "Admin found", adminEmail: adminEmail ,role: "admin" });
    }
    catch(error){
        console.log("Error in adminController");
        res.status(500).json({message: "Error in adminController"});
    }
}