import insertPartner from "../../models/partner/insert.model.js";

async function AddPartner(req, res, next) {
    try {
        const { name, url } = req.body;
        const img = req.file ? `/uploads/logoPartners/${req.file.filename}` : null;
        const partner = await insertPartner({ name, img, url: url || null });

        res.status(201).json({ 
            success: true,
            message: "Partner created successfully",
            data: partner
        });
        
    } catch (error) {
        console.error('An error occurred while inserting the partner', error);
        next(error);
    }


}

export default AddPartner