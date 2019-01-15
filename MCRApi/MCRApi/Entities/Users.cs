using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MCRApi.Entities
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [Required]
        [MaxLength(120)]
        public string firstname { get; set; }

        [Required]
        [MaxLength(120)]
        public string lastname { get; set; }

        [Required]
        [MaxLength(120)]
        public string username { get; set; }

        [Required]
        [MaxLength(120)]
        public string password { get; set; }

        public DateTime? createdAt { get; set; }

        public DateTime? updatedAt { get; set; }
    }
}
