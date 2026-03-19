#!/bin/bash

# Script de suivi des candidatures immobilières
# Utilisation : ./suivi_candidatures.sh

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fichiers de stockage
DATA_FILE="candidatures.json"
HTML_FILE="suivi_candidatures.html"

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}ℹ ${NC}$1"
}

log_success() {
    echo -e "${GREEN}✓ ${NC}$1"
}

log_error() {
    echo -e "${RED}✗ ${NC}$1"
}

log_warning() {
    echo -e "${YELLOW}⚠ ${NC}$1"
}

# Initialiser le fichier JSON s'il n'existe pas
init_json() {
    if [ ! -f "$DATA_FILE" ]; then
        echo '{"candidatures": []}' > "$DATA_FILE"
        log_success "Fichier de données créé : $DATA_FILE"
    fi
}

# Valider le format de date DD-MM-YYYY
valider_date() {
    local date=$1
    if [[ $date =~ ^[0-3][0-9]-[0-1][0-9]-[0-9]{4}$ ]]; then
        # Vérifier que la date est valide
        local day=${date:0:2}
        local month=${date:3:2}
        local year=${date:6:4}
        
        if [[ $day -lt 1 || $day -gt 31 || $month -lt 1 || $month -gt 12 ]]; then
            return 1
        fi
        return 0
    fi
    return 1
}

# Valider le format d'heure HH:MM
valider_heure() {
    local heure=$1
    if [[ $heure =~ ^[0-2][0-9]:[0-5][0-9]$ ]]; then
        return 0
    fi
    return 1
}

# Valider l'email
valider_email() {
    local email=$1
    if [[ $email =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        return 0
    fi
    return 1
}

# Valider le numéro de téléphone (simple)
# Format accepté: 06 12 34 56 78 ou +33612345678 ou (06)1234567890, etc.
valider_telephone() {
    local tel=$1
    # Accepter les chiffres, espaces, tirets, points, parenthèses et le +
    # Au moins 9 caractères (pour éviter les numéros trop courts)
    if [[ $tel =~ ^[0-9+\s\-\.()]+$ ]] && [ ${#tel} -ge 9 ]; then
        return 0
    fi
    return 1
}

# Générer un ID unique
generer_id() {
    echo "appart_$(date +%s)_$RANDOM"
}

# Ajouter une nouvelle candidature
ajouter_candidature() {
    log_info "=== Ajouter une nouvelle candidature ==="
    
    # Localisation
    echo -n "Localisation de l'appartement (optionnel) : "
    read -r localisation
    
    # Loyer
    while true; do
        echo -n "Montant du loyer en € (optionnel, numérique) : "
        read -r loyer
        if [ -z "$loyer" ]; then
            loyer="null"
            break
        elif [[ $loyer =~ ^[0-9]+(\.[0-9]{2})?$ ]]; then
            break
        else
            log_error "Le loyer doit être un nombre valide (ex: 1500 ou 1500.00)"
        fi
    done
    
    # Visite effectuée
    echo -n "Avez-vous déjà visité cet appartement ? (o/n, vide=non) : "
    read -r visite_effectuee
    if [[ $visite_effectuee == "o" || $visite_effectuee == "O" ]]; then
        visite_effectuee="oui"
    else
        visite_effectuee="non"
    fi
    
    # Visite prévue (optionnel)
    visite_date=""
    visite_heure=""
    echo -n "Voulez-vous programmer une visite ? (o/n) : "
    read -r programmer_visite
    if [[ $programmer_visite == "o" || $programmer_visite == "O" ]]; then
        while true; do
            echo -n "Date de visite (format: DD-MM-YYYY, ex: 25-03-2026, optionnel) : "
            read -r visite_date
            if [ -z "$visite_date" ]; then
                visite_date=""
                break
            elif valider_date "$visite_date"; then
                break
            else
                log_error "Format invalide. Utilisez DD-MM-YYYY (ex: 25-03-2026)"
            fi
        done
        
        if [ -n "$visite_date" ]; then
            while true; do
                echo -n "Heure de visite (format: HH:MM, ex: 14:30, optionnel) : "
                read -r visite_heure
                if [ -z "$visite_heure" ]; then
                    visite_heure=""
                    break
                elif valider_heure "$visite_heure"; then
                    break
                else
                    log_error "Format invalide. Utilisez HH:MM (ex: 14:30)"
                fi
            done
        fi
    fi
    
    # Informations du propriétaire/agence
    echo -n "Nom du propriétaire ou de l'agence (optionnel) : "
    read -r nom_contact
    
    # Email de contact
    while true; do
        echo -n "Email de contact (format: exemple@domaine.fr, optionnel) : "
        read -r email_contact
        if [ -z "$email_contact" ]; then
            email_contact=""
            break
        elif valider_email "$email_contact"; then
            break
        else
            log_error "Format email invalide. Utilisez: exemple@domaine.fr"
        fi
    done
    
    # Téléphone
    while true; do
        echo -n "Numéro de téléphone (format: 06 12 34 56 78 ou +33612345678, optionnel) : "
        read -r tel_contact
        if [ -z "$tel_contact" ]; then
            tel_contact=""
            break
        elif valider_telephone "$tel_contact"; then
            break
        else
            log_error "Format invalide. Utilisez: 06 12 34 56 78 ou +33612345678 (minimum 9 caractères)"
        fi
    done
    
    # Créer l'objet candidature
    local id=$(generer_id)
    local date_creation=$(date '+%d-%m-%Y %H:%M:%S')
    local statut="pas_envoye"
    
    # Convertir les valeurs vides en null pour JSON
    local loyer_json=$loyer
    [ "$loyer" = "null" ] && loyer_json="null"
    
    local nom_contact_json=$([ -z "$nom_contact" ] && echo "null" || echo "\"$nom_contact\"")
    local email_contact_json=$([ -z "$email_contact" ] && echo "null" || echo "\"$email_contact\"")
    local tel_contact_json=$([ -z "$tel_contact" ] && echo "null" || echo "\"$tel_contact\"")
    
    local candidature=$(cat <<EOF
{
  "id": "$id",
  "localisation": "$([ -z "$localisation" ] && echo "" || echo "$localisation")",
  "loyer": $loyer_json,
  "visite_effectuee": "$visite_effectuee",
  "visite_date": "$([ -z "$visite_date" ] && echo "" || echo "$visite_date")",
  "visite_heure": "$([ -z "$visite_heure" ] && echo "" || echo "$visite_heure")",
  "contact": {
    "nom": $nom_contact_json,
    "email": $email_contact_json,
    "telephone": $tel_contact_json
  },
  "date_creation": "$date_creation",
  "statut_actuel": "$statut",
  "historique_statuts": [
    {
      "statut": "$statut",
      "date": "$date_creation",
      "notes": "Candidature créée"
    }
  ]
}
EOF
)
    
    # Ajouter à la base JSON
    local temp_file=$(mktemp)
    jq ".candidatures += [$candidature]" "$DATA_FILE" > "$temp_file"
    mv "$temp_file" "$DATA_FILE"
    
    log_success "Candidature ajoutée avec l'ID : $id"
}

# Afficher toutes les candidatures
afficher_candidatures() {
    log_info "=== Mes candidatures ==="
    
    local count=$(jq '.candidatures | length' "$DATA_FILE")
    
    if [ "$count" -eq 0 ]; then
        log_warning "Aucune candidature enregistrée"
        return
    fi
    
    jq -r '.candidatures[] | "\n📍 \(if .localisation == "" then "(Non renseigné)" else .localisation end) - \(if .loyer == null then "?" else .loyer end)€\nStatut: \(.statut_actuel) | Visite: \(.visite_effectuee)\nContact: \(if .contact.nom == null then "(Non renseigné)" else .contact.nom end) - \(if .contact.email == null then "(Non renseigné)" else .contact.email end)"' "$DATA_FILE"
}

# Éditer une candidature
editer_candidature() {
    log_info "=== Éditer une candidature ==="
    
    # Afficher les candidatures disponibles
    echo -e "\n${BLUE}Candidatures disponibles :${NC}"
    jq -r '.candidatures[] | "\(.id): \(.localisation) - \(.loyer)€"' "$DATA_FILE" | nl
    
    echo -n "Sélectionner l'ID de la candidature à éditer : "
    read -r id_selection
    
    # Vérifier que l'ID existe
    local existe=$(jq ".candidatures[] | select(.id == \"$id_selection\") | .id" "$DATA_FILE" 2>/dev/null || echo "")
    if [ -z "$existe" ]; then
        log_error "Candidature non trouvée"
        return 1
    fi
    
    # Afficher les champs actuels
    echo -e "\n${BLUE}Champs disponibles pour édition :${NC}"
    echo "1) Localisation"
    echo "2) Loyer"
    echo "3) Visite effectuée (oui/non)"
    echo "4) Date de visite"
    echo "5) Heure de visite"
    echo "6) Nom du propriétaire/agence"
    echo "7) Email"
    echo "8) Téléphone"
    echo "9) Retour au menu"
    
    while true; do
        echo -n "Choisir un champ à éditer (1-9) : "
        read -r choix_champ
        
        case $choix_champ in
            1)
                echo -n "Nouvelle localisation (laisser vide pour supprimer) : "
                read -r nouvelle_valeur
                local temp_file=$(mktemp)
                jq ".candidatures |= map(if .id == \"$id_selection\" then .localisation = \"$nouvelle_valeur\" else . end)" "$DATA_FILE" > "$temp_file"
                mv "$temp_file" "$DATA_FILE"
                log_success "Localisation mise à jour"
                ;;
            2)
                while true; do
                    echo -n "Nouveau loyer en € (laisser vide pour supprimer) : "
                    read -r nouvelle_valeur
                    if [ -z "$nouvelle_valeur" ]; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .loyer = null else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Loyer supprimé"
                        break
                    elif [[ $nouvelle_valeur =~ ^[0-9]+(\.[0-9]{2})?$ ]]; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .loyer = $nouvelle_valeur else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Loyer mis à jour"
                        break
                    else
                        log_error "Le loyer doit être un nombre valide (ex: 1500 ou 1500.00)"
                    fi
                done
                ;;
            3)
                echo -n "Avez-vous visité cet appartement ? (o/n) : "
                read -r nouvelle_valeur
                if [[ $nouvelle_valeur == "o" || $nouvelle_valeur == "O" ]]; then
                    nouvelle_valeur="oui"
                else
                    nouvelle_valeur="non"
                fi
                local temp_file=$(mktemp)
                jq ".candidatures |= map(if .id == \"$id_selection\" then .visite_effectuee = \"$nouvelle_valeur\" else . end)" "$DATA_FILE" > "$temp_file"
                mv "$temp_file" "$DATA_FILE"
                log_success "Statut de visite mis à jour"
                ;;
            4)
                while true; do
                    echo -n "Nouvelle date de visite (format: DD-MM-YYYY, laisser vide pour supprimer) : "
                    read -r nouvelle_valeur
                    if [ -z "$nouvelle_valeur" ]; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .visite_date = \"\" else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Date de visite supprimée"
                        break
                    elif valider_date "$nouvelle_valeur"; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .visite_date = \"$nouvelle_valeur\" else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Date de visite mise à jour"
                        break
                    else
                        log_error "Format invalide. Utilisez DD-MM-YYYY (ex: 25-03-2026)"
                    fi
                done
                ;;
            5)
                while true; do
                    echo -n "Nouvelle heure de visite (format: HH:MM, laisser vide pour supprimer) : "
                    read -r nouvelle_valeur
                    if [ -z "$nouvelle_valeur" ]; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .visite_heure = \"\" else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Heure de visite supprimée"
                        break
                    elif valider_heure "$nouvelle_valeur"; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .visite_heure = \"$nouvelle_valeur\" else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Heure de visite mise à jour"
                        break
                    else
                        log_error "Format invalide. Utilisez HH:MM (ex: 14:30)"
                    fi
                done
                ;;
            6)
                echo -n "Nouveau nom du propriétaire/agence (laisser vide pour supprimer) : "
                read -r nouvelle_valeur
                local temp_file=$(mktemp)
                if [ -z "$nouvelle_valeur" ]; then
                    jq ".candidatures |= map(if .id == \"$id_selection\" then .contact.nom = null else . end)" "$DATA_FILE" > "$temp_file"
                else
                    jq ".candidatures |= map(if .id == \"$id_selection\" then .contact.nom = \"$nouvelle_valeur\" else . end)" "$DATA_FILE" > "$temp_file"
                fi
                mv "$temp_file" "$DATA_FILE"
                log_success "Nom du contact mis à jour"
                ;;
            7)
                while true; do
                    echo -n "Nouveau email (format: exemple@domaine.fr, laisser vide pour supprimer) : "
                    read -r nouvelle_valeur
                    if [ -z "$nouvelle_valeur" ]; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .contact.email = null else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Email supprimé"
                        break
                    elif valider_email "$nouvelle_valeur"; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .contact.email = \"$nouvelle_valeur\" else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Email mis à jour"
                        break
                    else
                        log_error "Format email invalide. Utilisez: exemple@domaine.fr"
                    fi
                done
                ;;
            8)
                while true; do
                    echo -n "Nouveau téléphone (format: 06 12 34 56 78 ou +33612345678, laisser vide pour supprimer) : "
                    read -r nouvelle_valeur
                    if [ -z "$nouvelle_valeur" ]; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .contact.telephone = null else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Téléphone supprimé"
                        break
                    elif valider_telephone "$nouvelle_valeur"; then
                        local temp_file=$(mktemp)
                        jq ".candidatures |= map(if .id == \"$id_selection\" then .contact.telephone = \"$nouvelle_valeur\" else . end)" "$DATA_FILE" > "$temp_file"
                        mv "$temp_file" "$DATA_FILE"
                        log_success "Téléphone mis à jour"
                        break
                    else
                        log_error "Format invalide. Utilisez: 06 12 34 56 78 ou +33612345678 (minimum 9 caractères)"
                    fi
                done
                ;;
            9)
                log_info "Retour au menu"
                return
                ;;
            *)
                log_error "Option invalide"
                ;;
        esac
        
        echo ""
    done
}

# Mettre à jour le statut d'une candidature
mettre_a_jour_statut() {
    log_info "=== Mettre à jour le statut ==="
    
    # Afficher les candidatures disponibles
    echo -e "\n${BLUE}Candidatures disponibles :${NC}"
    jq -r '.candidatures[] | "\(.id): \(.localisation) - \(.loyer)€ [\(.statut_actuel)]"' "$DATA_FILE" | nl
    
    echo -n "Sélectionner l'ID de la candidature : "
    read -r id_selection
    
    # Vérifier que l'ID existe
    local existe=$(jq ".candidatures[] | select(.id == \"$id_selection\") | .id" "$DATA_FILE" 2>/dev/null || echo "")
    if [ -z "$existe" ]; then
        log_error "Candidature non trouvée"
        return 1
    fi
    
    # Afficher les statuts possibles
    echo -e "\n${BLUE}Nouveaux statuts possibles :${NC}"
    echo "1) pas_envoye"
    echo "2) envoye"
    echo "3) en_attente"
    echo "4) reponse_negative"
    echo "5) reponse_positive"
    echo -n "Choisir un statut (1-5) : "
    read -r choix_statut
    
    local nouveau_statut=""
    case $choix_statut in
        1) nouveau_statut="pas_envoye" ;;
        2) nouveau_statut="envoye" ;;
        3) nouveau_statut="en_attente" ;;
        4) nouveau_statut="reponse_negative" ;;
        5) nouveau_statut="reponse_positive" ;;
        *) log_error "Choix invalide"; return 1 ;;
    esac
    
    # Ajouter une note optionnelle
    echo -n "Notes (optionnel, appuyez sur Entrée pour ignorer) : "
    read -r notes
    [ -z "$notes" ] && notes="Statut mis à jour"
    
    local date_maj=$(date '+%d-%m-%Y %H:%M:%S')
    
    # Mettre à jour la candidature
    local temp_file=$(mktemp)
    jq ".candidatures |= map(
        if .id == \"$id_selection\" then
            .statut_actuel = \"$nouveau_statut\" |
            .historique_statuts += [{
                \"statut\": \"$nouveau_statut\",
                \"date\": \"$date_maj\",
                \"notes\": \"$notes\"
            }]
        else
            .
        end
    )" "$DATA_FILE" > "$temp_file"
    mv "$temp_file" "$DATA_FILE"
    
    log_success "Statut mis à jour : $nouveau_statut"
}

# Mettre à jour les infos de visite
mettre_a_jour_visite() {
    log_info "=== Mettre à jour les infos de visite ==="
    
    # Afficher les candidatures disponibles
    echo -e "\n${BLUE}Candidatures disponibles :${NC}"
    jq -r '.candidatures[] | "\(.id): \(.localisation) - \(.visite_effectuee)"' "$DATA_FILE" | nl
    
    echo -n "Sélectionner l'ID de la candidature : "
    read -r id_selection
    
    # Vérifier que l'ID existe
    local existe=$(jq ".candidatures[] | select(.id == \"$id_selection\") | .id" "$DATA_FILE" 2>/dev/null || echo "")
    if [ -z "$existe" ]; then
        log_error "Candidature non trouvée"
        return 1
    fi
    
    # Demander si visite effectuée
    echo -n "Avez-vous visité cet appartement ? (o/n) : "
    read -r visite_effectuee
    if [[ $visite_effectuee == "o" || $visite_effectuee == "O" ]]; then
        visite_effectuee="oui"
    else
        visite_effectuee="non"
    fi
    
    # Visite prévue
    visite_date=""
    visite_heure=""
    echo -n "Programmer une visite ? (o/n) : "
    read -r programmer_visite
    if [[ $programmer_visite == "o" || $programmer_visite == "O" ]]; then
        while true; do
            echo -n "Date de visite (DD-MM-YYYY) : "
            read -r visite_date
            if valider_date "$visite_date"; then
                break
            else
                log_error "Format invalide. Utilisez DD-MM-YYYY"
            fi
        done
        
        while true; do
            echo -n "Heure de visite (HH:MM) : "
            read -r visite_heure
            if valider_heure "$visite_heure"; then
                break
            else
                log_error "Format invalide. Utilisez HH:MM"
            fi
        done
    fi
    
    # Mettre à jour
    local temp_file=$(mktemp)
    jq ".candidatures |= map(
        if .id == \"$id_selection\" then
            .visite_effectuee = \"$visite_effectuee\" |
            .visite_date = \"$visite_date\" |
            .visite_heure = \"$visite_heure\"
        else
            .
        end
    )" "$DATA_FILE" > "$temp_file"
    mv "$temp_file" "$DATA_FILE"
    
    log_success "Informations de visite mises à jour"
}

# Générer la page HTML
generer_html() {
    log_info "Génération de la page HTML..."
    
    # Compter les statuts
    local pas_envoye=$(jq '[.candidatures[] | select(.statut_actuel == "pas_envoye")] | length' "$DATA_FILE")
    local envoye=$(jq '[.candidatures[] | select(.statut_actuel == "envoye")] | length' "$DATA_FILE")
    local en_attente=$(jq '[.candidatures[] | select(.statut_actuel == "en_attente")] | length' "$DATA_FILE")
    local reponse_negative=$(jq '[.candidatures[] | select(.statut_actuel == "reponse_negative")] | length' "$DATA_FILE")
    local reponse_positive=$(jq '[.candidatures[] | select(.statut_actuel == "reponse_positive")] | length' "$DATA_FILE")
    
    # Générer le tableau des candidatures
    tableau_html=$(jq -r '.candidatures | sort_by(.date_creation) | reverse[] | 
        "<tr class=\u0027statut-" + .statut_actuel + "\u0027>" +
        "<td>" + (if .localisation == "" then "<em>-</em>" else .localisation end) + "</td>" +
        "<td>" + (if .loyer == null then "<em>-</em>" else (.loyer | tostring) + "€" end) + "</td>" +
        "<td>" + .visite_effectuee + "</td>" +
        "<td>" + (if .visite_date != "" then .visite_date + " " + .visite_heure else "<em>-</em>" end) + "</td>" +
        "<td>" + (if .contact.nom == null then "<em>-</em>" else .contact.nom end) + "</td>" +
        "<td>" + (if .contact.email == null then "<em>-</em>" else .contact.email end) + "</td>" +
        "<td><span class=\u0027badge badge-" + .statut_actuel + "\u0027>" + .statut_actuel + "</span></td>" +
        "</tr>"' "$DATA_FILE")
    
    date_generation=$(date '+%d-%m-%Y à %H:%M:%S')
    
    cat > "$HTML_FILE" <<'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Suivi des Candidatures Immobilières</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            padding: 30px 20px;
            background: #f8f9fa;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-left: 4px solid;
        }
        
        .stat-card.pas-envoye {
            border-color: #6c757d;
        }
        
        .stat-card.envoye {
            border-color: #007bff;
        }
        
        .stat-card.en-attente {
            border-color: #ffc107;
        }
        
        .stat-card.negative {
            border-color: #dc3545;
        }
        
        .stat-card.positive {
            border-color: #28a745;
        }
        
        .stat-card .number {
            font-size: 2em;
            font-weight: bold;
            color: #333;
        }
        
        .stat-card .label {
            color: #666;
            font-size: 0.9em;
            margin-top: 5px;
        }
        
        .content {
            padding: 30px 20px;
        }
        
        .content h2 {
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8em;
        }
        
        .table-wrapper {
            overflow-x: auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        thead {
            background: #f8f9fa;
        }
        
        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #333;
            border-bottom: 2px solid #dee2e6;
        }
        
        td {
            padding: 15px;
            border-bottom: 1px solid #dee2e6;
        }
        
        tbody tr {
            transition: background-color 0.2s;
        }
        
        tbody tr:hover {
            background-color: #f8f9fa;
        }
        
        .badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
            text-transform: capitalize;
        }
        
        .badge-pas_envoye {
            background: #e2e3e5;
            color: #383d41;
        }
        
        .badge-envoye {
            background: #cfe2ff;
            color: #084298;
        }
        
        .badge-en_attente {
            background: #fff3cd;
            color: #664d03;
        }
        
        .badge-reponse_negative {
            background: #f8d7da;
            color: #842029;
        }
        
        .badge-reponse_positive {
            background: #d1e7dd;
            color: #0f5132;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }
            
            .stats {
                grid-template-columns: repeat(2, 1fr);
            }
            
            table {
                font-size: 0.9em;
            }
            
            th, td {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 Suivi de mes Candidatures</h1>
            <p>Gestion centralisée de vos recherches immobilières</p>
        </div>
        
        <div class="stats">
            <div class="stat-card pas-envoye">
                <div class="number">PAS_ENVOYE_COUNT</div>
                <div class="label">Pas envoyées</div>
            </div>
            <div class="stat-card envoye">
                <div class="number">ENVOYE_COUNT</div>
                <div class="label">Envoyées</div>
            </div>
            <div class="stat-card en-attente">
                <div class="number">EN_ATTENTE_COUNT</div>
                <div class="label">En attente</div>
            </div>
            <div class="stat-card negative">
                <div class="number">NEGATIVE_COUNT</div>
                <div class="label">Refusées</div>
            </div>
            <div class="stat-card positive">
                <div class="number">POSITIVE_COUNT</div>
                <div class="label">Acceptées</div>
            </div>
        </div>
        
        <div class="content">
            <h2>Détail des candidatures</h2>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Localisation</th>
                            <th>Loyer</th>
                            <th>Visite</th>
                            <th>Date/Heure</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                     <tbody>
                        TABLEAU_PLACEHOLDER
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="footer">
            <p>Généré le: GENERATION_PLACEHOLDER</p>
        </div>
    </div>
</body>
</html>
EOF

    # Remplacer les placeholders avec perl pour éviter les problèmes de sed avec les caractères spéciaux
    perl -i -pe "s/PAS_ENVOYE_COUNT/$pas_envoye/g" "$HTML_FILE"
    perl -i -pe "s/ENVOYE_COUNT/$envoye/g" "$HTML_FILE"
    perl -i -pe "s/EN_ATTENTE_COUNT/$en_attente/g" "$HTML_FILE"
    perl -i -pe "s/NEGATIVE_COUNT/$reponse_negative/g" "$HTML_FILE"
    perl -i -pe "s/POSITIVE_COUNT/$reponse_positive/g" "$HTML_FILE"
    perl -i -pe "s/GENERATION_PLACEHOLDER/$date_generation/g" "$HTML_FILE"
    
    # Remplacer le tableau (qui contient du HTML)
    python3 -c "
import re
with open('$HTML_FILE', 'r') as f:
    content = f.read()
tableau = '''$tableau_html'''
content = content.replace('TABLEAU_PLACEHOLDER', tableau)
with open('$HTML_FILE', 'w') as f:
    f.write(content)
"
    
    log_success "Page HTML générée : $HTML_FILE"
    
    # Copier et déployer sur Surge
    mkdir -p surge_deploy
    cp "$HTML_FILE" surge_deploy/
    
    if command -v surge &> /dev/null; then
        log_info "En déploiement sur Surge..."
        echo ""
        
        # Créer un fichier temporaire pour capturer la sortie
        local deploy_log=$(mktemp)
        
        # Lancer le déploiement et capturer la sortie
        if surge surge_deploy joli-logis.surge.sh --skip-browser > "$deploy_log" 2>&1; then
            # Vérifier que le déploiement a réussi en cherchant "Success!" dans les logs
            if grep -q "Success!" "$deploy_log"; then
                echo ""
                log_success "Déploiement terminé"
                echo -e "${GREEN}✓ Page accessible sur :${NC} https://joli-logis.surge.sh"
                
                # Extraire et afficher l'URL de production
                local prod_url=$(grep -o "Production[[:space:]]*\.\*[[:space:]]*\([a-z0-9-]*\.surge\.sh\)" "$deploy_log" | tail -1 || echo "joli-logis.surge.sh")
                echo -e "${GREEN}✓ URL Production :${NC} https://joli-logis.surge.sh"
                
                # Afficher la taille du fichier déployé
                local file_size=$(ls -lh surge_deploy/index.html | awk '{print $5}')
                echo -e "${GREEN}✓ Taille du fichier :${NC} $file_size"
                
            else
                echo ""
                log_error "Problème avec le déploiement"
                echo ""
                echo "Détails de l'erreur :"
                tail -20 "$deploy_log"
            fi
        else
            # Le déploiement a échoué
            echo ""
            log_error "Problème avec le déploiement"
            echo ""
            echo "Détails de l'erreur :"
            tail -20 "$deploy_log"
        fi
        
        rm -f "$deploy_log"
    else
        log_warning "Surge n'est pas installé"
        echo "Installation : npm install -g surge"
    fi
}

# Menu principal
menu_principal() {
    while true; do
        clear
        echo -e "${BLUE}"
        echo "╔════════════════════════════════════════╗"
        echo "║  📋 Suivi des Candidatures Immobilières║"
        echo "╚════════════════════════════════════════╝"
        echo -e "${NC}"
        echo ""
        echo "1) Ajouter une nouvelle candidature"
        echo "2) Voir toutes mes candidatures"
        echo "3) Éditer une candidature"
        echo "4) Mettre à jour le statut"
        echo "5) Mettre à jour les infos de visite"
        echo "6) Générer la page HTML"
        echo "7) Quitter"
        echo ""
        echo -n "Choisir une option (1-7) : "
        read -r choix
        
        echo ""
        case $choix in
            1) ajouter_candidature ;;
            2) afficher_candidatures ;;
            3) editer_candidature ;;
            4) mettre_a_jour_statut ;;
            5) mettre_a_jour_visite ;;
            6) generer_html ;;
            7) 
                log_info "Au revoir !"
                exit 0
                ;;
            *) log_error "Option invalide" ;;
        esac
        
        echo ""
        echo -n "Appuyez sur Entrée pour continuer..."
        read -r
    done
}

# Lancer le script
main() {
    init_json
    menu_principal
}

main "$@"
