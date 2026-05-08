export const getUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCredits = async (req, res) => {
  try {
    const { credits } = req.body;
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      $inc: { credits: credits },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update credits" });
  }
};